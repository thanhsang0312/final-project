import React, { useEffect } from "react";
import owlCarousels from "../../utils/owlCarousels";
import classNames from "classnames";
import ProductCart from "../../components/ProductCart";

const SectionProductList = ({
  categories,
  featuredProducts,
  selectedCategory,
  handleSelectCate,
}) => {
  useEffect(() => {
    owlCarousels();
  }, [selectedCategory]);

  const _onSelectCate = (e, slug) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleSelectCate?.("");
    setTimeout(() => {
      handleSelectCate?.(slug);
    }, 200);
  };

  return (
    <div className="container top" style={{ height: 505 }}>
      <div className="heading heading-flex mb-3">
        <div className="heading-left">
          <h2 className="title">Featured Products</h2>
        </div>
        <div className="heading-right">
          <ul
            className="nav nav-pills nav-border-anim justify-content-center"
            role="tablist"
          >
            {categories?.map((category) => {
              const { name, slug } = category || {};
              return (
                <li className="nav-item">
                  <a
                    // className="nav-link active"
                    className={classNames("nav-link", {
                      active: selectedCategory === slug,
                    })}
                    id="top-all-link"
                    data-toggle="tab"
                    href="#top-all-tab"
                    role="tab"
                    aria-controls="top-all-tab"
                    aria-selected="true"
                    onClick={(e) => _onSelectCate(e, slug)}
                  >
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="tab-content tab-content-carousel just-action-icons-sm">
        <div
          // className="tab-pane p-0 fade show active"
          className={classNames("tab-pane p-0 fade", {
            "show active": featuredProducts?.length > 0,
          })}
          id="top-all-tab"
          role="tabpanel"
          aria-labelledby="top-all-link"
        >
          {featuredProducts?.length > 0 && (
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                                      "nav": true, 
                                                      "dots": false,
                                                      "margin": 20,
                                                      "loop": false,
                                                      "responsive": {
                                                          "0": {
                                                              "items":2
                                                          },
                                                          "480": {
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
              {featuredProducts.map((product) => {
                return <ProductCart key={product.id} {...product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionProductList;
