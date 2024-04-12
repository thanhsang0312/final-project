import React from "react";
import ProductQuantity from "../../components/ProductQuantity";

const CartTable = () => {
  return (
    <div className="col-lg-9">
      <table className="table table-cart table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="product-col">
              <div className="product">
                <figure className="product-media">
                  <a href="#">
                    <img
                      src="assets/images/demos/demo-3/products/product-6.jpg"
                      alt="Product image"
                    />
                  </a>
                </figure>
                <h3 className="product-title">
                  <a href="#">Beige knitted elastic runner shoes</a>
                </h3>
              </div>
            </td>
            <td className="price-col">$84.00</td>
            <td className="quantity-col">
              <div className="cart-product-quantity">
                <input
                  type="number"
                  className="form-control"
                  defaultValue={1}
                  min={1}
                  max={10}
                  step={1}
                  data-decimals={0}
                  required
                />
              </div>
            </td>
            <td className="total-col">$84.00</td>
            <td className="remove-col">
              <button className="btn-remove">
                <i className="icon-close" />
              </button>
            </td>
          </tr>
          <tr>
            <td className="product-col">
              <div className="product">
                <figure className="product-media">
                  <a href="#">
                    <img
                      src="assets/images/demos/demo-3/products/product-2-2.jpg"
                      alt="Product image"
                    />
                  </a>
                </figure>
                <h3 className="product-title">
                  <a href="#">Blue utility pinafore denim dress</a>
                </h3>
              </div>
            </td>
            <td className="price-col">$76.00</td>
            <td className="quantity-col">
              <div className="cart-product-quantity">
                <ProductQuantity />
              </div>
            </td>
            <td className="total-col">$76.00</td>
            <td className="remove-col">
              <button className="btn-remove">
                <i className="icon-close" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="cart-bottom">
        <div className="cart-discount">
          <form action="#">
            <div className="input-group">
              <input
                type="text"
                className="form-control input-error"
                required
                placeholder="Coupon code"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-primary-2" type="submit">
                  <i className="icon-long-arrow-right" />
                </button>
              </div>
            </div>
            <p className="form-error">Please fill in this field</p>
          </form>
        </div>
        <a href="#" className="btn btn-outline-dark-2">
          <span>UPDATE CART</span>
          <i className="icon-refresh" />
        </a>
      </div>
    </div>
  );
};

export default CartTable;
