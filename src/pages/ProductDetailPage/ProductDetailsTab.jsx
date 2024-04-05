import classNames from "classnames";
import moment from "moment";
import React, { useState } from "react";

const TABS = {
  desc: "description",
  shipping: "shipping&return",
  review: "review",
};

const ProductDetailsTab = ({ productDetailData, productDetailReview }) => {
  const { description, shippingReturn } = productDetailData || {};
  const [activeTab, setActiveTab] = useState(TABS.desc);

  const _onTabChange = (e, tab) => {
    e?.preventDefault();
    e?.stopPropagation();
    setActiveTab(tab);
  };

  return (
    <div className="product-details-tab">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === TABS.desc ? "active" : ""}`}
            id="product-desc-link"
            data-toggle="tab"
            href="#product-desc-tab"
            role="tab"
            aria-controls="product-desc-tab"
            aria-selected="true"
            onClick={(e) => _onTabChange(e, TABS.desc)}
          >
            Description
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              activeTab === TABS.shipping ? "active" : ""
            }`}
            id="product-shipping-link"
            data-toggle="tab"
            href="#product-shipping-tab"
            role="tab"
            aria-controls="product-shipping-tab"
            aria-selected="false"
            onClick={(e) => _onTabChange(e, TABS.shipping)}
          >
            Shipping &amp; Returns
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === TABS.review ? "active" : ""}`}
            id="product-review-link"
            data-toggle="tab"
            href="#product-review-tab"
            role="tab"
            aria-controls="product-review-tab"
            aria-selected="false"
            onClick={(e) => _onTabChange(e, TABS.review)}
          >
            Reviews ({productDetailReview?.data?.length})
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {activeTab === TABS.desc && (
          <div
            className="tab-pane fade show active"
            id="product-desc-tab"
            role="tabpanel"
            aria-labelledby="product-desc-link"
          >
            <div className="product-desc-content">
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        )}
        {activeTab === TABS.shipping && (
          <div
            className="tab-pane fade show active"
            id="product-shipping-tab"
            role="tabpanel"
            aria-labelledby="product-shipping-link"
          >
            <div className="product-desc-content">
              <div dangerouslySetInnerHTML={{ __html: shippingReturn }} />
            </div>
          </div>
        )}
        {activeTab === TABS.review && (
          <div
            className="tab-pane fade show active"
            id="product-review-tab"
            role="tabpanel"
            aria-labelledby="product-review-link"
          >
            <div className="reviews">
              <h3>
                {productDetailReview?.data?.length
                  ? `Review (${productDetailReview?.data?.length})`
                  : "There is no any review"}
              </h3>
              {productDetailReview?.data?.map((review) => {
                const {
                  id,
                  description: reviewDesc,
                  rate,
                  order,
                  title,
                  updatedAt,
                } = review || {};
                return (
                  <div className="review" key={id}>
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <h4>
                          <a href="#">#{order.slice(-4)}</a>
                        </h4>
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: `${(rate || 0) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="review-date">
                          {moment(updatedAt).format("DD/MM/YYYY")}
                        </span>
                      </div>
                      <div className="col">
                        <h4>{title}</h4>
                        <div className="review-content">
                          <div
                            dangerouslySetInnerHTML={{ __html: reviewDesc }}
                          />
                        </div>
                        <div className="review-action">
                          <a href="#">
                            <i className="icon-thumbs-up" />
                            Helpful (2){" "}
                          </a>
                          <a href="#">
                            <i className="icon-thumbs-down" />
                            Unhelpful (0){" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsTab;
