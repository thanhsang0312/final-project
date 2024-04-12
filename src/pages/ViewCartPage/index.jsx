import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import PATHS from "../../const/path";
import CartTable from "./CartTable";
import CartSumary from "./CartSumary";
import useCartPage from "./useCartPage";

const ViewCartPage = () => {
  const { cartSumaryProps, cartTableProps } = useCartPage();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{
          backgroundImage: 'url("/assets/images/page-header-bg.jpg")',
        }}
      >
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      </div>
      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCT.INDEX}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>
      {/* End breadcrumb */}
      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <CartTable {...cartTableProps} />
              <CartSumary {...cartSumaryProps} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewCartPage;
