import { message } from "antd";
import React, { useState } from "react";
import { REGEX } from "../../const/regex";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../Button";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "../../store/reducer/authReducer";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const _onSubmit = (data) => {
    console.log("data", data);
    if (data && !loading.register) {
      try {
        dispatch(
          handleRegister({ ...data, firstName: "", lastName: "" })
        ).unwrap();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      <form action="#" onSubmit={handleSubmit(_onSubmit)}>
        <Input
          label="Your email address "
          required
          rest={{
            ...register("email", {
              require: "Please enter your email",
              pattern: {
                value: REGEX.email,
                message: "Please enter correct email!",
              },
            }),
          }}
          error={errors?.email?.message}
        ></Input>
        <Input
          type="password"
          label="Password "
          required
          rest={{
            ...register("password", {
              required: "Please enter your password!",
            }),
          }}
        ></Input>
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
