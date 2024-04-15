import React from "react";
import { formatUSD } from "../../utils/formatCurrency";
import { Link, useNavigate } from "react-router-dom";
import PATHS from "../../const/path";
import { message } from "antd";
import RadioGroup from "../../components/RadioGroup";
import { SHIPPING_OPTIONS } from "../../const/general";

const CartSumary = ({
  total,
  subTotal,
  typeShip,
  shipping,
  handleUpdateShipping,
}) => {
  const navigate = useNavigate();
  const _onProceedCheckout = (e) => {
    e?.preventDefault();
    if (!typeShip) {
      message.error("Please select shipping method!");
    } else {
      navigate(PATHS.CHECKOUT);
    }
  };
  return (
    <aside className="col-lg-3">
      <div className="summary summary-cart">
        <h3 className="summary-title">Cart Total</h3>
        <table className="table table-summary">
          <tbody>
            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>{formatUSD(subTotal)}</td>
            </tr>
            <tr className="summary-shipping">
              <td>Shipping:</td>
              <td>&nbsp;</td>
            </tr>
            <RadioGroup
              onChange={handleUpdateShipping}
              defaultValue={typeShip || ""}
            >
              {SHIPPING_OPTIONS.map((option) => {
                const { value, label, price } = option || {};
                return (
                  <tr className="summary-shipping-row" key={value}>
                    <td>
                      <RadioGroup.Item value={value}>{label}</RadioGroup.Item>
                    </td>
                    <td>{formatUSD(price)}</td>
                  </tr>
                );
              })}
            </RadioGroup>
            {/* <tr className="summary-shipping-row">
              <td>
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="free-shipping"
                    name="shipping"
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="free-shipping"
                  >
                    Free Shipping
                  </label>
                </div>
              </td>
              <td>$0.00</td>
            </tr>
            <tr className="summary-shipping-row">
              <td>
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="standart-shipping"
                    name="shipping"
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="standart-shipping"
                  >
                    Standart:
                  </label>
                </div>
              </td>
              <td>$10.00</td>
            </tr>
            <tr className="summary-shipping-row">
              <td>
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="express-shipping"
                    name="shipping"
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="express-shipping"
                  >
                    Express:
                  </label>
                </div>
              </td>
              <td>$20.00</td>
            </tr> */}
            <tr className="summary-shipping-estimate">
              <td>
                Estimate for Your Country <br />
                <Link to={PATHS.PROFILE.INDEX}>Change address</Link>
              </td>
              <td>&nbsp;</td>
            </tr>
            <tr className="summary-total">
              <td>Total:</td>
              <td>{formatUSD(total)}</td>
            </tr>
          </tbody>
        </table>
        <a
          href="checkout.html"
          className="btn btn-outline-primary-2 btn-order btn-block"
          onClick={_onProceedCheckout}
        >
          PROCEED TO CHECKOUT
        </a>
      </div>
      <Link
        to={PATHS.PRODUCT.INDEX}
        className="btn btn-outline-dark-2 btn-block mb-3"
      >
        <span>CONTINUE SHOPPING</span>
        <i className="icon-refresh" />
      </Link>
    </aside>
  );
};

export default CartSumary;
