import React from "react";
import ProductFilter from "./ProductFilter";
import ProductToolbox from "./ProductToolbox";
import ProductList from "./ProductList";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import PATHS from "../../const/path";
import useProductPage from "./useProductPage";
import Pagination from "../../components/Pagination";

const ProductPage = () => {
  const {
    productToolboxProps,
    paginationProps,
    productFilterProps,
    productListProps,
  } = useProductPage();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>
      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Product</Breadcrumb.Item>
      </Breadcrumb>
      {/* End Breadcrumb */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <ProductToolbox {...productToolboxProps} />
              <ProductList {...productListProps} />
              <Pagination {...paginationProps} />
            </div>
            <ProductFilter {...productFilterProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
