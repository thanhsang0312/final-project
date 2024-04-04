import React from "react";
import PATHS from "../../const/path";
import { Link } from "react-router-dom";

const IntroItemList = ({ introProducts }) => {
  return (
    <div className="col-lg-4">
      <div className="intro-banners">
        {introProducts?.map((product) => {
          const { name, images, slug, id } = product || {};
          const productDetailPath = PATHS.PRODUCT.INDEX + `/${slug}`;
          return (
            <div className="banner mb-lg-1 mb-xl-2" key={id}>
              <Link to={productDetailPath}>
                <img
                  src={images?.[0] || ""}
                  alt="Banner"
                  style={{
                    height: 119,
                    objectFit: "contain",
                    objectPosition: "center right",
                  }}
                />
              </Link>
              <div className="banner-content">
                <h3 className="banner-title">
                  <Link to={productDetailPath}>{name}</Link>
                </h3>
                <Link to={productDetailPath} className="banner-link">
                  Shop Now <i className="icon-long-arrow-right" />
                </Link>
              </div>
            </div>
          );
        })}
        {/* <div className="banner mb-lg-1 mb-xl-2">
          <a href="#">
            <img
              src="assets/images/demos/demo-3/banners/banner-1.jpg"
              alt="Banner"
            />
          </a>
          <div className="banner-content">
            <h3 className="banner-title">
              <a href="#">
                Edifier <br />
                Stereo Bluetooth{" "}
              </a>
            </h3>
            <a href="#" className="banner-link">
              Shop Now <i className="icon-long-arrow-right" />
            </a>
          </div>
        </div>
        <div className="banner mb-lg-1 mb-xl-2">
          <a href="#">
            <img
              src="assets/images/demos/demo-3/banners/banner-2.jpg"
              alt="Banner"
            />
          </a>
          <div className="banner-content">
            <h3 className="banner-title">
              <a href="#">
                GoPro - Fusion 360 <span>Save $70</span>
              </a>
            </h3>
            <a href="#" className="banner-link">
              Shop Now <i className="icon-long-arrow-right" />
            </a>
          </div>
        </div>
        <div className="banner mb-0">
          <a href="#">
            <img
              src="assets/images/demos/demo-3/banners/banner-3.jpg"
              alt="Banner"
            />
          </a>
          <div className="banner-content">
            <h3 className="banner-title">
              <a href="#">
                Apple Watch 4 <span>Our Hottest Deals</span>
              </a>
            </h3>
            <a href="#" className="banner-link">
              Shop Now <i className="icon-long-arrow-right" />
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default IntroItemList;
