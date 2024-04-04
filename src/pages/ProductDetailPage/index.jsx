import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import PATHS from "../../const/path";
import { Link } from "react-router-dom";
import ProductDetailGallery from "./ProductDetailGallery";
import ProductDetail from "./ProductDetail";
import ProductDetailsTab from "./ProductDetailsTab";
import useProductDetailPage from "./useProductDetailPage";

const ProductDetailPage = () => {
  const { galleryProps, detailProps, tabProps } = useProductDetailPage();
  return (
    <main className="main">
      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCT.INDEX}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>
          {galleryProps.productDetailData?.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      {/* End breadcrumb */}
      <div className="page-content">
        <div className="container">
          <div className="product-details-top">
            <div className="row">
              <ProductDetailGallery {...galleryProps} />
              <ProductDetail {...detailProps} />
            </div>
          </div>
          <ProductDetailsTab {...tabProps} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
