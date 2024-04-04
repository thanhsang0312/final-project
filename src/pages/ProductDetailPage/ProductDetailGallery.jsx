import React, { useEffect } from "react";

const ProductDetailGallery = ({
  selectedImage,
  productDetailData,
  handleActiveImage,
}) => {
  useEffect(() => {
    handleActiveImage(productDetailData?.images?.[0]);
  }, [productDetailData?.images?.[0]]);

  const onActiveImage = (e, src) => {
    e?.preventDefault();
    handleActiveImage(src);
  };
  return (
    <div className="col-md-6">
      <div className="product-gallery product-gallery-vertical">
        <div className="row">
          <figure className="product-main-image">
            <img
              id="product-zoom"
              src={selectedImage}
              data-zoom-image={selectedImage}
              alt="product image"
            />
            <div id="btn-product-gallery" className="btn-product-gallery">
              <i className="icon-arrows" />
            </div>
          </figure>

          <div id="product-zoom-gallery" className="product-image-gallery">
            {productDetailData?.images?.map((image, index) => {
              return (
                <a
                  className={`product-gallery-item ${
                    selectedImage === image ? "active" : ""
                  }`}
                  href="#"
                  data-image={image}
                  data-zoom-image={image}
                  key={index}
                  onClick={(e) => onActiveImage(e, image)}
                >
                  <img src={image} alt="Dark yellow lace" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailGallery;
