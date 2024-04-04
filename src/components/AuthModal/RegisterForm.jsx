import { message } from "antd";
import React, { useState } from "react";
import { REGEX } from "../../const/regex";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../Button";
import Input from "../Input";

const RegisterForm = () => {
  const { handleShowModal, handleCloseModal, handleRegister } =
    useAuthContext();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    e.preventDefault();

    // start validate
    const errorObject = {};

    if (!!!form.email) {
      errorObject.email = "Please enter your email!";
    } else if (!REGEX["email"].test(form.email)) {
      errorObject.email = "Please enter a valid email";
    }

    if (!!!form.password) {
      errorObject.password = "Please enter your password";
    }

    setError(errorObject);
    // end validate

    if (Object.keys(errorObject)?.length > 0) {
      console.log("Submit error", errorObject);
    } else {
      setLoading(true);
      console.log("Submit success", form);
      handleRegister({ ...form }, () => {
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
          label="Your email address "
          required
          {...register("email")}
        ></Input>
        <Input label="Password " required {...register("password")}></Input>
        <div className="form-footer">
          <Button type="submit" variant="primary">
            SIGN UP
            <i className="icon-long-arrow-right" />
          </Button>
          {/* <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="register-policy"
              required
            />
            <label className="custom-control-label" htmlFor="register-policy">
              I agree to the
              <a href="privacy-policy.html">privacy policy</a> *
            </label>
          </div> */}
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
            <a href="#" className="btn btn-login  btn-f">
              <i className="icon-facebook-f" />
              Login With Facebook
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
