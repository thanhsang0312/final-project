import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Controller, set, useForm } from "react-hook-form";
import { Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAddress from "../../hooks/useAddress";
import Input from "../../components/Input";
import { REGEX } from "../../const/regex";
import styled from "styled-components";
import { authService } from "../../services/authServices";
import { handleGetProfile } from "../../store/reducer/authReducer";
import { removeAccents } from "../../utils/formatCurrency";
import moment from "moment";

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileDetailPage = () => {
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { firstName, phone, email, province, district, ward, street } =
    profile || {};
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

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm();

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
      birthday: profile?.birthday
        ? moment(profile?.birthday || "01-01-2000")
            .format("YYYY/MM/DD")
            .replaceAll("/", "-")
        : "",
    });
    handleProvinceChange?.(province);
    handleDistrictChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);

  const _onSubmit = async (data) => {
    console.log("data", data);
    const payload = {
      ...data,
      lastName: profile?.lastName,
    };
    try {
      const res = await authService.updateProfile(payload);
      if (res) {
        message.success("Update profile successfully!");
        dispatch(handleGetProfile());
      }
    } catch (error) {
      message.error("Update failed!");
    }
  };

  return (
    <div
      className="tab-pane fade show active"
      id="tab-account"
      role="tabpanel"
      aria-labelledby="tab-account-link"
    >
      <form action="#" className="account-form">
        <div className="row">
          <div className="col-sm-6">
            <Input
              type="text"
              required
              label="Name"
              rest={{
                ...register("firstName", {
                  required: "Please enter your name!",
                }),
              }}
              error={errors?.firstName?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              type="text"
              required
              disabled
              label="Email Address"
              rest={{
                ...register("email", {
                  required: "Please enter your email!",
                  pattern: {
                    value: REGEX.email,
                    message: "Please enter correct email!",
                  },
                }),
              }}
              error={errors?.email?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Input
              type="text"
              required
              label="Phone Number"
              rest={{
                ...register("phone", {
                  required: "Please enter your phone number!",
                  pattern: {
                    value: REGEX.phone,
                    message: "Please enter a valid phone number!",
                  },
                }),
              }}
              error={errors?.phone?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              type="date"
              required
              label="Ngày sinh"
              rest={{
                ...register("birthday", {
                  required: "Please enter your birthday!",
                }),
              }}
              error={errors?.birthday?.message || ""}
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
          label="Street"
          rest={{
            ...register("street", {
              required: "Please enter your address!",
            }),
          }}
          error={errors?.street?.message}
        />

        <button
          type="submit"
          className="btn btn-outline-primary-2"
          onClick={handleSubmit(_onSubmit)}
        >
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default ProfileDetailPage;
