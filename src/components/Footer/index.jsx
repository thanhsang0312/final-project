import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../const/path";
import useQuery from "../../hooks/useQuery";
import { pageService } from "../../services/pageServices";

const Footer = () => {
  const { data: footerData } = useQuery(() =>
    pageService.getPageDataByName("footer")
  );
  const footer = footerData?.data?.data || {};
  const { description, hotline, usefulLink, customerService, myAccount } =
    footer || {};
  const { title: usefulTitle, item: usefulItem } = usefulLink || {};
  const { title: serviceTitle, item: serviceItem } = customerService || {};
  const { title: accountTitle, item: accountItem } = myAccount || {};
  const usefulPath = [
    PATHS.ABOUT,
    PATHS.PRODUCT.INDEX,
    PATHS.FAQ,
    PATHS.CONTACT,
  ];

  const servicePath = [
    PATHS.PAYMENT,
    PATHS.RETURNS,
    PATHS.SHIPPING,
    PATHS.PRIVACY,
  ];

  const accountPath = [
    PATHS.PROFILE.INDEX,
    PATHS.VIEW_CART,
    PATHS.PROFILE.PROFILE_WISHLIST,
    PATHS.PROFILE.PROFILE_ORDER,
  ];

  return (
    <footer className="footer">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-5">
              <div className="widget widget-about">
                <img
                  src="/assets/images/logo.svg"
                  className="footer-logo"
                  alt="Footer Logo"
                  width={120}
                />
                <p>{description} </p>
                <div className="widget-call">
                  <i className="icon-phone" /> Got Question? Call us 24/7{" "}
                  <a href="tel:#">{hotline}</a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-2 offset-lg-1">
              <div className="widget">
                <h4 className="widget-title">{usefulTitle}</h4>
                <ul className="widget-list">
                  {usefulItem?.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link to={usefulPath[index]}>{item}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-2">
              <div className="widget">
                <h4 className="widget-title">{serviceTitle}</h4>
                <ul className="widget-list">
                  {serviceItem?.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link to={servicePath[index]}>{item}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-2">
              <div className="widget">
                <h4 className="widget-title">{accountTitle}</h4>
                <ul className="widget-list">
                  {accountItem?.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link to={accountPath[index]}>{item}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copyright">
            Copyright © 2023{" "}
            <a href="https://cfdcircle.vn/" target="_blank">
              <strong>CFD Circle</strong>
            </a>
            . All Rights Reserved.
          </p>
          <figure className="footer-payments">
            <img
              src="assets/images/payments.png"
              alt="Payment methods"
              width={272}
              height={20}
            />
          </figure>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
