import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Input from "../../components/Input";
import { REGEX } from "../../const/regex";
import { Select, message } from "antd";
import { formatUSD, removeAccents } from "../../utils/formatCurrency";
import useAddress from "../../hooks/useAddress";
import { PAYMENT_METHOD } from "../../const/general";
import { Link } from "react-router-dom";
import PATHS from "../../const/path";
import classNames from "classnames";

const FormContainer = styled.form`
  .form-group {
    margin: 0;
  }
`;

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckoutForm = ({ handleCheckout }) => {
  const { profile } = useSelector((state) => state.auth);
  const { cartInfo } = useSelector((state) => state.cart);

  const { firstName, phone, email, province, district, ward, street } =
    profile || {};

  const {
    product,
    subTotal,
    shipping,
    total,
    quantity,
    variant,
    totalProduct,
    discount,
    discountCode,
  } = cartInfo || {};

  const renderProductInfo =
    product?.map((item, index) => {
      return {
        ...item,
        quantity: quantity?.[index],
        variant: variant?.[index],
        totalProduct: totalProduct?.[index],
      };
    }) || [];

  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(
    PAYMENT_METHOD.cash
  );

  const isCash = currentPaymentMethod === PAYMENT_METHOD.cash;
  const isCard = currentPaymentMethod === PAYMENT_METHOD.card;

  const {
    provinceID,
    provinces,
    districtID,
    districts,
    wardID,
    wards,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  } = useAddress();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName,
      phone,
      email,
      province,
      district,
      ward,
      street,
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset?.({
      firstName,
      phone,
      email,
      province,
      district,
      ward,
      street,
    });
    handleProvinceChange?.(province);
    handleDistrictChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);

  const _onSubmit = (data) => {
    if (!shipping?.typeShip) {
      message.error("Please select shipping method!");
      return;
    }
    if (!currentPaymentMethod) {
      message.error("Please select payment method!");
      return;
    }

    handleCheckout?.({
      formInfo: {
        ...data,
        province: provinces?.find((item) => item.value === provinceID),
        district: districts?.find((item) => item.value === districtID),
        ward: wards?.find((item) => item.value === wardID),
        paymentMethod: currentPaymentMethod,
      },
      cartInfo,
    });
  };

  const _onProvinceChange = (changeId) => {
    handleProvinceChange?.(changeId);
    reset({
      ...getValues(),
      province: changeId,
      district: undefined,
      ward: undefined,
    });
  };

  const _onDistrictChange = (changeId) => {
    handleDistrictChange?.(changeId);
    reset({
      ...getValues(),
      district: changeId,
      ward: undefined,
    });
  };

  const _onWardChange = (changeId) => {
    handleWardChange?.(changeId);
    reset({
      ...getValues(),
      ward: changeId,
    });
  };
  return (
    <FormContainer onSubmit={handleSubmit(_onSubmit)} className="checkout-form">
      <div className="row">
        <div className="col-lg-9">
          <h2 className="checkout-title">Billing Details</h2>
          <div className="row">
            <div className="col-sm-4">
              <Input
                type="text"
                required
                label="Full Name"
                rest={{
                  ...register("firstName", {
                    required: "This field cannot be empty!",
                  }),
                }}
                error={errors?.firstName?.message || ""}
              />
            </div>
            <div className="col-sm-4">
              <Input
                type="text"
                required
                label="Phone Number"
                rest={{
                  ...register("phone", {
                    required: "This field cannot be empty!",
                    pattern: {
                      value: REGEX.phone,
                      message: "Please enter a valid phone number!",
                    },
                  }),
                }}
                error={errors?.firstName?.message || ""}
              />
            </div>
            <div className="col-sm-4">
              <Input
                type="text"
                required
                label="Email Address"
                rest={{
                  ...register("email", {
                    required: "This field cannot be empty!",
                    pattern: {
                      value: REGEX.email,
                      message: "Please enter correct email!",
                    },
                  }),
                }}
                error={errors?.firstName?.message || ""}
              />
            </div>
          </div>
          <div className="row">
            <AddressWrapper className="col-sm-4">
              <label>Province/City *</label>
              <Controller
                name="province"
                control={control}
                rules={{
                  required: "This field cannot be empty!",
                }}
                render={({ formState: { errors } }) => {
                  return (
                    <>
                      <Select
                        className="customSelect"
                        suffixIcon={<></>}
                        showSearch
                        placeholder="Please select Province/City"
                        options={provinces}
                        value={provinceID}
                        optionFilterProp="children"
                        onChange={_onProvinceChange}
                        filterOption={(input, option) =>
                          removeAccents(option?.label ?? "")
                            .toLowerCase()
                            .includes(removeAccents(input.toLowerCase()))
                        }
                      />
                      <p className="form-error" style={{ minHeight: 23 }}>
                        {errors?.province?.message || ""}
                      </p>
                    </>
                  );
                }}
              />
            </AddressWrapper>
            <AddressWrapper className="col-sm-4">
              <label>District/Town *</label>
              <Controller
                name="district"
                control={control}
                rules={{
                  required: "This field cannot be empty!",
                }}
                render={({ formState: { errors } }) => {
                  return (
                    <>
                      <Select
                        className="customSelect"
                        suffixIcon={<></>}
                        showSearch
                        placeholder="Please select District/Town"
                        options={districts}
                        value={districtID}
                        optionFilterProp="children"
                        onChange={_onDistrictChange}
                        filterOption={(input, option) =>
                          removeAccents(option?.label ?? "")
                            .toLowerCase()
                            .includes(removeAccents(input.toLowerCase()))
                        }
                      />
                      <p className="form-error" style={{ minHeight: 23 }}>
                        {errors?.district?.message || ""}
                      </p>
                    </>
                  );
                }}
              />
            </AddressWrapper>
            <AddressWrapper className="col-sm-4">
              <label>Ward *</label>
              <Controller
                name="ward"
                control={control}
                rules={{
                  required: "This field cannot be empty!",
                }}
                render={({ formState: { errors } }) => {
                  return (
                    <>
                      <Select
                        className="customSelect"
                        suffixIcon={<></>}
                        showSearch
                        placeholder="Please select Ward"
                        options={wards}
                        value={wardID}
                        optionFilterProp="children"
                        onChange={_onWardChange}
                        filterOption={(input, option) =>
                          removeAccents(option?.label ?? "")
                            .toLowerCase()
                            .includes(removeAccents(input.toLowerCase()))
                        }
                      />
                      <p className="form-error" style={{ minHeight: 23 }}>
                        {errors?.ward?.message || ""}
                      </p>
                    </>
                  );
                }}
              />
            </AddressWrapper>
          </div>
          <Input
            type="text"
            required
            label="Street address"
            rest={{
              ...register("street", {
                required: "This field cannot be empty!",
              }),
            }}
            error={errors?.street?.message || ""}
          />
          <Input
            type="text"
            label="Order notes (optional)"
            renderInput={(inputProps) => {
              return (
                <textarea
                  {...inputProps}
                  {...register("note")}
                  className="form-control"
                  cols={30}
                  rows={4}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                />
              );
            }}
            error={errors?.note?.message || ""}
          />
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="checkout-create-acc"
            />
            <label
              className="custom-control-label"
              htmlFor="checkout-create-acc"
            >
              Create an account?
            </label>
          </div>
        </div>
        <aside className="col-lg-3">
          <div className="summary">
            <h3 className="summary-title">Your Order</h3>
            <table className="table table-summary">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {renderProductInfo?.map((product) => {
                  const { name, quantity, price, totalProduct } = product || {};
                  return (
                    <tr>
                      <td>
                        <a href="#">{name}</a>
                        <p>
                          {quantity} x {formatUSD(price)}
                        </p>
                      </td>
                      <td>{formatUSD(totalProduct)}</td>
                    </tr>
                  );
                })}
                <tr className="summary-subtotal">
                  <td>Subtotal:</td>
                  <td>{formatUSD(subTotal)}</td>
                </tr>
                {shipping ? (
                  <tr>
                    <td>Shipping:</td>
                    <td>
                      {shipping?.typeShip} - {formatUSD(shipping?.price)}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>Shipping: </td>
                    <td>
                      <Link to={PATHS.VIEW_CART}>Select Shipping</Link>
                    </td>
                  </tr>
                )}
                {discountCode && (
                  <tr>
                    <td>Discount: </td>
                    <td>
                      {discountCode} - {formatUSD(discount)}
                    </td>
                  </tr>
                )}
                <tr className="summary-total">
                  <td>Total:</td>
                  <td>{formatUSD(total)}</td>
                </tr>
              </tbody>
            </table>
            <div className="accordion-summary" id="accordion-payment">
              <div className="card">
                <div
                  className="card-header"
                  id="heading-1"
                  onClick={() => setCurrentPaymentMethod(PAYMENT_METHOD.card)}
                  style={{ cursor: "pointer" }}
                >
                  <h2 className="card-title">
                    <a role="button" className={`${!isCard && "collapsed"}`}>
                      {" "}
                      Direct bank transfer{" "}
                    </a>
                  </h2>
                </div>
                <div
                  id="collapse-1"
                  className={classNames("collapse", { show: isCard })}
                >
                  <div className="card-body">
                    {" "}
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.{" "}
                  </div>
                </div>
              </div>
              <div className="card">
                <div
                  className="card-header"
                  id="heading-3"
                  onClick={() => setCurrentPaymentMethod(PAYMENT_METHOD.cash)}
                  style={{ cursor: "pointer" }}
                >
                  <h2 className="card-title">
                    <a className={`${!isCash && "collapsed"}`} role="button">
                      {" "}
                      Cash on delivery{" "}
                    </a>
                  </h2>
                </div>
                <div
                  id="collapse-3"
                  className={classNames("collapse", { show: isCash })}
                >
                  <div className="card-body">
                    Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit. Donec odio. Quisque volutpat
                    mattis eros.{" "}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary-2 btn-order btn-block"
            >
              <span className="btn-text">Place Order</span>
              <span className="btn-hover-text">Proceed to Checkout</span>
            </button>
          </div>
        </aside>
      </div>
    </FormContainer>
  );
};

export default CheckoutForm;
