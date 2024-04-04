import React from "react";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import classNames from "classnames";
import Overlay from "../Overlay";
import { MODAL_TYPE } from "../../const/general";

const AuthModalContainer = styled.div`
  display: ${(props) => (props?.isShow ? "block" : "none")};
`;

const AuthModal = () => {
  const { showModal, handleShowModal, handleCloseModal } = useAuthContext();
  const _onTabChange = (e, tab) => {
    e?.stopPropagation();
    e?.preventDefault();
    handleShowModal?.(tab);
  };
  return (
    <>
      {showModal && (
        <div
          className={`modal-backdrop fade ${showModal ? "show" : ""} `}
          onClick={handleCloseModal}
        />
      )}
      <AuthModalContainer
        // className="modal fade"
        className={classNames("modal fade", { show: !!showModal })}
        isShow={!!showModal}
        id="signin-modal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul
                    className="nav nav-pills nav-fill nav-border-anim"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        // className="nav-link active"
                        className={classNames("nav-link", {
                          active: showModal === MODAL_TYPE.signin,
                        })}
                        id="signin-tab"
                        data-toggle="tab"
                        href="#signin"
                        role="tab"
                        aria-controls="signin"
                        aria-selected="true"
                        onClick={(e) => {
                          _onTabChange(e, MODAL_TYPE.signin);
                        }}
                      >
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={classNames("nav-link", {
                          active: showModal === MODAL_TYPE.register,
                        })}
                        id="register-tab"
                        data-toggle="tab"
                        href="#register"
                        role="tab"
                        aria-controls="register"
                        aria-selected="false"
                        onClick={(e) => {
                          _onTabChange(e, MODAL_TYPE.register);
                        }}
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    <div
                      className="tab-pane fade show active"
                      id="signin"
                      role="tabpanel"
                      aria-labelledby="signin-tab"
                    >
                      {showModal === MODAL_TYPE.signin && <LoginForm />}
                      {showModal === MODAL_TYPE.register && <RegisterForm />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthModalContainer>
    </>
  );
};

export default AuthModal;
