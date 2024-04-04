import React, { useEffect, useState } from "react";
import { formatUSD } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";
import PATHS from "../../const/path";
import ProductColor from "../../components/ProductColor";
import ProductQuantity from "../../components/ProductQuantity";
import ShareLink from "../../components/ShareLink";

const ProductDetail = ({
  productDetailData,
  productDetailReview,
  colorRef,
  quantityRef,
  handleAddToCart,
  handleAddToWishList,
}) => {
  const { name, price, rating, description, color, category, stock } =
    productDetailData || {};
  const pathURL = window.location.href;
  const categoryPath =
    category?.id && PATHS.PRODUCT.INDEX + `?category=${category?.id}`;

  const _onAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleAddToCart?.();
  };

  const _onAddToWishList = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleAddToWishList?.();
  };

  return (
    <div className="col-md-6">
      <div className="product-details">
        <h1 className="product-title">{name}</h1>
        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{ width: `${(rating || 0) * 100}%` }}
            />
          </div>
          <a
            className="ratings-text"
            href="#product-review-link"
            id="review-link"
          >
            ( {productDetailReview?.data?.length} review )
          </a>
        </div>
        <div className="product-price"> {formatUSD(price)} </div>
        <div
          className="product-content"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
        <div className="details-filter-row details-row-size">
          <label>Color:</label>
          <div className="product-nav product-nav-dots">
            <ProductColor ref={colorRef} colors={color} />
          </div>
        </div>
        <div className="details-filter-row details-row-size">
          <label htmlFor="qty">Qty:</label>
          <div className="product-details-quantity">
            <ProductQuantity ref={quantityRef} max={stock} />
          </div>
        </div>
        <div className="product-details-action">
          <a href="#" className="btn-product btn-cart" onClick={_onAddToCart}>
            <span>add to cart</span>
          </a>
          <div className="details-action-wrapper">
            <a
              href="#"
              className="btn-product btn-wishlist"
              title="Wishlist"
              onClick={_onAddToWishList}
            >
              <span>Add to Wishlist</span>
            </a>
          </div>
        </div>
        <div className="product-details-footer">
          <div className="product-cat">
            <span>Category:</span>
            <Link to={categoryPath}>{category?.name}</Link>
          </div>
          <div className="social-icons social-icons-sm">
            <span className="social-label">Share:</span>
            <ShareLink title={"Facebook"} path={pathURL}>
              <i className="icon-facebook-f" />
            </ShareLink>
            <ShareLink type="twitter" title={"Twitter"} path={pathURL}>
              <i className="icon-twitter" />
            </ShareLink>
            <ShareLink type="instagram" title={"Instagram"} path={pathURL}>
              <i className="icon-instagram" />
            </ShareLink>
            <ShareLink type="pinterest" title={"Pinterest"} path={pathURL}>
              <i className="icon-pinterest" />
            </ShareLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
