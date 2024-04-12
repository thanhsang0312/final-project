import React from "react";
import PATHS from "../../const/path";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import formatNumber, { formatUSD } from "../../utils/formatCurrency";
import { useDispatch } from "react-redux";
import { handleAddCart } from "../../store/reducer/cartReducer";

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;

const ProductCart = ({
  title,
  price,
  rating,
  images,
  discount,
  id,
  slug,
  color,
}) => {
  const productDetailPath = PATHS.PRODUCT.INDEX + `/${slug}`;
  const dispatch = useDispatch();

  const _onAddToCart = (e) => {
    e?.preventDefault();
    const addPayload = {
      addedId: id,
      addedColor: color?.[0] || "",
      addedQuantity: 1,
      addedPrice: price - discount,
    };

    dispatch(handleAddCart(addPayload));
  };
  return (
    <div className="product product-2">
      <figure className="product-media">
        <Link to={productDetailPath} style={{ height: 275 }}>
          {images?.length > 0 ? (
            <img
              src={images[0]}
              alt="Product image"
              className="product-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <ImageWrapper>
              <Empty
                description=""
                // props này mặc định của Antd Empty, dùng để thay đổi ảnh của Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </ImageWrapper>
          )}
        </Link>
        <div className="product-action-vertical">
          <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
            <span>add to wishlist</span>
          </a>
        </div>
        <div className="product-action product-action-dark">
          <a
            href="#"
            className="btn-product btn-cart"
            title="Add to cart"
            onClick={_onAddToCart}
          >
            <span>add to cart</span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={productDetailPath}>{title}</Link>
        </h3>
        <div className="product-price">
          {discount ? (
            <>
              {" "}
              <span className="new-price">{formatUSD(price - discount)}</span>
              <span className="old-price">Was {formatUSD(price)}</span>{" "}
            </>
          ) : (
            <>{formatUSD(price)}</>
          )}
        </div>
        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{
                width: `${(rating || 0) * 20}%`,
              }}
            />
          </div>
          <span className="ratings-text">( {rating} Reviews )</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
