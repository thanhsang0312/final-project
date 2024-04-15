import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import PATHS from "../../const/path";
import ProfileNavAccount from "./ProfileNavAccount";

const ProfilePage = () => {
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">My Account</h1>
        </div>
      </div>
      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>My Account</Breadcrumb.Item>
      </Breadcrumb>
      {/* End Breadcrumb */}
      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <ProfileNavAccount />
              <div className="col-md-8 col-lg-9">
                <div className="tab-content">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
