import React, { useEffect, useState } from "react";
import owlCarousels from "../../utils/owlCarousels";
import classNames from "classnames";
import ProductCart from "../../components/ProductCart";

const TABS = {
  featured: "Featured",
  onsale: "On Sale",
  toprated: "Top Rated",
};

const SectionFeatured = ({
  productsFeatured,
  onSaleProduct,
  topRatedProduct,
}) => {
  const [selectedTab, setSelectedTab] = useState(TABS.featured);

  useEffect(() => {
    owlCarousels();
  }, [selectedTab, productsFeatured, onSaleProduct, topRatedProduct]);

  const _onTabChange = (e, tab) => {
    e?.preventDefault();
    e?.stopPropagation();
    setSelectedTab("");
    setTimeout(() => {
      setSelectedTab(tab);
    }, 200);
  };

  const _getSelectedProducts = (tab) => {
    switch (tab) {
      case TABS.featured:
        return productsFeatured;
      case TABS.onsale:
        return onSaleProduct;
      case TABS.toprated:
        return topRatedProduct;
      default:
        return [];
    }
  };

  const renderProducts = _getSelectedProducts(selectedTab);

  return (
    <div className="container featured" style={{ height: 550 }}>
      <ul
        className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
        role="tablist"
      >
        <li className="nav-item">
          <a
            // className="nav-link active"
            className={classNames("nav-link", {
              active: selectedTab === TABS.featured,
            })}
            id="products-featured-link"
            data-toggle="tab"
            href="#products-featured-tab"
            role="tab"
            aria-controls="products-featured-tab"
            aria-selected="true"
            onClick={(e) => _onTabChange(e, TABS.featured)}
          >
            Featured
          </a>
        </li>
        <li className="nav-item">
          <a
            className={classNames("nav-link", {
              active: selectedTab === TABS.onsale,
            })}
            id="products-sale-link"
            data-toggle="tab"
            href="#products-sale-tab"
            role="tab"
            aria-controls="products-sale-tab"
            aria-selected="false"
            onClick={(e) => _onTabChange(e, TABS.onsale)}
          >
            On Sale
          </a>
        </li>
        <li className="nav-item">
          <a
            className={classNames("nav-link", {
              active: selectedTab === TABS.toprated,
            })}
            id="products-top-link"
            data-toggle="tab"
            href="#products-top-tab"
            role="tab"
            aria-controls="products-top-tab"
            aria-selected="false"
            onClick={(e) => _onTabChange(e, TABS.toprated)}
          >
            Top Rated
          </a>
        </li>
      </ul>
      <div className="tab-content tab-content-carousel">
        <div
          // className="tab-pane p-0 fade show active"
          className={classNames("tab-pane p-0 fade", {
            "show active": renderProducts?.length > 0,
          })}
          id="products-featured-tab"
          role="tabpanel"
          aria-labelledby="products-featured-link"
        >
          {renderProducts?.length > 0 && (
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                                      "nav": true, 
                                                      "dots": true,
                                                      "margin": 20,
                                                      "loop": false,
                                                      "responsive": {
                                                          "0": {
                                                              "items":2
                                                          },
                                                          "600": {
                                                              "items":2
                                                          },
                                                          "992": {
                                                              "items":3
                                                          },
                                                          "1200": {
                                                              "items":4
                                                          }
                                                      }
                                                  }'
            >
              {renderProducts.map((product) => {
                return <ProductCart key={product.id} {...product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionFeatured;
