import React, { useState } from "react";
import { useMainContext } from "../../context/MainContext";
import { MenuStyled } from "../StyledComponents";
import { NavLink, useNavigate } from "react-router-dom";
import PATHS from "../../const/path";
import classNames from "classnames";
import useQuery from "../../hooks/useQuery";
import useProductPage from "../../pages/ProductPage/useProductPage";
import { productService } from "../../services/productServices";

const MENUS = {
  menu: "menu",
  cate: "categories",
};

const MenuMobile = () => {
  const { handleCloseMenuMobile } = useMainContext();
  const [selectedTab, setSelectedTab] = useState(MENUS.menu);
  const [selected, setSelected] = useState("TV");
  const navigate = useNavigate();

  const { data: categoriesData } = useQuery(productService.getCategories);
  const categories = categoriesData?.data?.products || [];
  console.log("categories", categories);

  const _onTabChange = (e, tab) => {
    e?.preventDefault();
    setSelectedTab(tab);
  };

  const _onClickToCate = (cateId, cateName) => {
    navigate(PATHS.PRODUCT.INDEX + `?category=${cateId}`);
    setSelected(cateName);
    handleCloseMenuMobile();
  };
  return (
    <>
      <div className="mobile-menu-overlay" onClick={handleCloseMenuMobile} />
      <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close" onClick={handleCloseMenuMobile}>
            <i className="icon-close" />
          </span>
          <form action="#" method="get" className="mobile-search">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="mobile-search"
              id="mobile-search"
              placeholder="Search in..."
              required
            />
            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </form>
          <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  selectedTab === MENUS.menu ? "active" : ""
                }`}
                href="#mobile-menu-tab"
                onClick={(e) => _onTabChange(e, MENUS.menu)}
              >
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  selectedTab === MENUS.cate ? "active" : ""
                }`}
                href="#mobile-cats-tab"
                onClick={(e) => _onTabChange(e, MENUS.cate)}
              >
                Categories
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className={`tab-pane fade ${
                selectedTab === MENUS.menu ? "show active" : ""
              }`}
              id="mobile-menu-tab"
              role="tabpanel"
              aria-labelledby="mobile-menu-link"
            >
              <nav className="mobile-nav">
                <MenuStyled className="mobile-menu">
                  <li>
                    <NavLink to={PATHS.HOME}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.ABOUT}>About Us</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.PRODUCT.INDEX}>Product</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.BLOG.INDEX}>Blog</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
                  </li>
                </MenuStyled>
              </nav>
              {/* End .mobile-nav */}
            </div>
            {/* .End .tab-pane */}
            <div
              className={`tab-pane fade ${
                selectedTab === MENUS.cate ? "show active" : ""
              }`}
              id="mobile-cats-tab"
              role="tabpanel"
              aria-labelledby="mobile-cats-link"
            >
              <nav className="mobile-cats-nav">
                <ul className="mobile-cats-menu">
                  {categories?.length > 0 &&
                    categories.map((category, index) => {
                      const { name, id } = category || {};
                      return (
                        <li key={id || index}>
                          <a
                            className="mobile-cats-lead"
                            href="#"
                            onClick={() => _onClickToCate(id, name)}
                          >
                            {name}
                          </a>
                        </li>
                      );
                    })}
                  {/* <li>
                    <a className="mobile-cats-lead" href="#">
                      TV
                    </a>
                  </li>
                  <li>
                    <a href="#">Computers</a>
                  </li>
                  <li>
                    <a href="#">Tablets &amp; Cell Phones</a>
                  </li>
                  <li>
                    <a href="#">Smartwatches</a>
                  </li>
                  <li>
                    <a href="#">Accessories</a>
                  </li> */}
                </ul>
                {/* End .mobile-cats-menu */}
              </nav>
              {/* End .mobile-cats-nav */}
            </div>
            {/* .End .tab-pane */}
          </div>
          {/* End .tab-content */}
          <div className="social-icons">
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Facebook"
            >
              <i className="icon-facebook-f" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Twitter">
              <i className="icon-twitter" />
            </a>
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Instagram"
            >
              <i className="icon-instagram" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Youtube">
              <i className="icon-youtube" />
            </a>
          </div>
          {/* End .social-icons */}
        </div>
        {/* End .mobile-menu-wrapper */}
      </div>
    </>
  );
};

export default MenuMobile;
