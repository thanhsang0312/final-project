import React from "react";
import { MODAL_TYPE } from "../../const/general";
import { useAuthContext } from "../../context/AuthContext";
import tokenMethod from "../../utils/token";
import { Link, useNavigate } from "react-router-dom";
import PATHS from "../../const/path";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout, handleShowModal } from "../../store/reducer/authReducer";

const HeaderTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = !!!tokenMethod.get();
  const { profile } = useSelector((state) => state.auth);
  const { firstName, email } = profile || {};
  const _onShowAuthModal = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleShowModal(MODAL_TYPE.signin));
    // handleShowModal?.(MODAL_TYPE.signin);
  };
  const _onSignOut = (e) => {
    e?.preventDefault();
    dispatch(handleLogout());
    navigate(PATHS.HOME);
    // handleLogout();
  };
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0989596912">
            <i className="icon-phone" /> Hotline: 098 9596 912{" "}
          </a>
        </div>
        <div className="header-right">
          {/* Not LogIn */}
          {isLogged ? (
            <ul className="top-menu top-link-menu">
              <li>
                <a
                  href="#signin-modal"
                  data-toggle="modal"
                  className="top-menu-login"
                  onClick={_onShowAuthModal}
                >
                  <i className="icon-user" />
                  Login | Resgister{" "}
                </a>
              </li>
            </ul>
          ) : (
            <ul className="top-menu">
              <li>
                <a href="#" className="top-link-menu">
                  <i className="icon-user" />
                  {firstName}{" "}
                </a>
                <ul>
                  <li>
                    <ul>
                      <li>
                        <Link to={PATHS.PROFILE.INDEX}>Account Details</Link>
                      </li>
                      <li>
                        <Link to={PATHS.PROFILE.PROFILE_ORDER}>
                          Your Orders
                        </Link>
                      </li>
                      <li>
                        <Link to={PATHS.PROFILE.PROFILE_WISHLIST}>
                          Wishlist <span>(3)</span>
                        </Link>
                      </li>
                      <li>
                        <a href="#" onClick={_onSignOut}>
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          )}

          {/* Logged In */}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
