import { Empty } from "antd";
import React, { useEffect } from "react";

const ProductDetailGallery = ({
  selectedImage,
  productDetailData,
  handleActiveImage,
}) => {
  useEffect(() => {
    // Product Image Zoom plugin - product pages
    if ($.fn.elevateZoom && productDetailData?.images?.length > 0) {
      $("#product-zoom").elevateZoom({
        gallery: "product-zoom-gallery",
        galleryActiveClass: "active",
        zoomType: "inner",
        cursor: "crosshair",
        zoomWindowFadeIn: 400,
        zoomWindowFadeOut: 400,
        responsive: true,
      });

      // On click change thumbs active item
      $(".product-gallery-item").on("click", function (e) {
        $("#product-zoom-gallery").find("a").removeClass("active");
        $(this).addClass("active");

        e.preventDefault();
      });

      var ez = $("#product-zoom").data("elevateZoom");

      // Open popup - product images
      $("#btn-product-gallery").on("click", function (e) {
        if ($.fn.magnificPopup) {
          $.magnificPopup.open(
            {
              items: ez.getGalleryList(),
              type: "image",
              gallery: {
                enabled: true,
              },
              fixedContentPos: false,
              removalDelay: 600,
              closeBtnInside: false,
            },
            0
          );

          e.preventDefault();
        }
      });
    }
    return () => {
      $(".zoomContainer").remove();
    };
  }, [productDetailData?.images]);

  const onActiveImage = (e, src) => {
    e?.preventDefault();
    handleActiveImage(src);
  };
  return (
    <div className="col-md-6">
      <div className="product-gallery product-gallery-vertical">
        <div className="row">
          <figure className="product-main-image">
            {!!productDetailData?.images?.length ? (
              <img
                id="product-zoom"
                src={productDetailData?.images[0]}
                data-zoom-image={productDetailData?.images[0]}
                alt="product image"
              />
            ) : (
              <Empty />
            )}
            <div id="btn-product-gallery" className="btn-product-gallery">
              <i className="icon-arrows" />
            </div>
          </figure>

          <div id="product-zoom-gallery" className="product-image-gallery">
            {productDetailData?.images?.length &&
              productDetailData?.images?.map((image, index) => {
                return (
                  <a
                    className={`product-gallery-item ${
                      index === 0 ? "active" : ""
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
