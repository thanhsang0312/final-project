import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PATHS from "../../const/path";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../store/reducer/authReducer";

const ProfileNavAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const _onSignOut = (e) => {
    e?.preventDefault();
    dispatch(handleLogout());
    navigate(PATHS.HOME);
    // handleLogout();
  };
  return (
    <aside className="col-md-4 col-lg-3">
      <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            id="tab-account-link"
            data-toggle="tab"
            to={PATHS.PROFILE.INDEX}
            role="tab"
            aria-controls="tab-account"
            aria-selected="false"
            end
          >
            Account Details
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            id="tab-orders-link"
            data-toggle="tab"
            to={PATHS.PROFILE.PROFILE_ORDER}
            role="tab"
            aria-controls="tab-orders"
            aria-selected="false"
          >
            Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            id="tab-address-link"
            data-toggle="tab"
            to={PATHS.PROFILE.PROFILE_ADDRESS}
            role="tab"
            aria-controls="tab-address"
            aria-selected="false"
          >
            Adresses
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            id="tab-wishlist-link"
            data-toggle="tab"
            to={PATHS.PROFILE.PROFILE_WISHLIST}
            role="tab"
            aria-controls="tab-wishlist"
            aria-selected="false"
          >
            Wishlist
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            id="tab-change-password-link"
            data-toggle="tab"
            to={PATHS.PROFILE.PROFILE_CHANGE_PASS}
            role="tab"
            aria-controls="tab-wishlist"
            aria-selected="false"
          >
            Change Password
          </NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={_onSignOut}>
            Sign Out
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default ProfileNavAccount;
