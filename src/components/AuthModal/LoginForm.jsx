import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Input from "../Input";
import Button from "../Button";
import { message } from "antd";
import { REGEX } from "../../const/regex";

const LoginForm = () => {
  const { handleShowModal, handleCloseModal, handleLogin } = useAuthContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };

  const _onSubmit = (e) => {
    e?.preventDefault();

    const errorObject = {};

    if (!!!form.email) {
      errorObject.email = "Please enter your email!";
    } else if (!REGEX["email"].test(form.email)) {
      errorObject.email = "Please enter a valid email!";
    }

    if (!!!form.password) {
      errorObject.password = "Please enter your password!";
    }

    setError(errorObject);

    if (Object.keys(errorObject)?.length > 0) {
      console.log("Submit error", errorObject);
    } else {
      setLoading(true);
      console.log("Submit success", form);
      setLoading(true);
      handleLogin?.({ ...form }, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
  };
  return (
    <>
      <form action="#" onSubmit={_onSubmit}>
        <Input
          label="Username or email address "
          required
          {...register("email")}
        ></Input>
        <Input label="Password " required {...register("password")}></Input>
        <div className="form-footer">
          <Button type="submit" variant="primary">
            LOG IN
            <i className="icon-long-arrow-right" />
          </Button>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="signin-remember"
            />
            <label className="custom-control-label" htmlFor="signin-remember">
              Remember Me
            </label>
          </div>
          <a href="#" className="forgot-link">
            Forgot Your Password?
          </a>
        </div>
      </form>
      <div className="form-choice">
        <p className="text-center">or sign in with</p>
        <div className="row">
          <div className="col-sm-6">
            <a href="#" className="btn btn-login btn-g">
              <i className="icon-google" />
              Login With Google
            </a>
          </div>
          <div className="col-sm-6">
            <a href="#" className="btn btn-login btn-f">
              <i className="icon-facebook-f" />
              Login With Facebook
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
