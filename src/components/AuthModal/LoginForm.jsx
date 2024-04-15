import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Input from "../Input";
import Button from "../Button";
import { message } from "antd";
import { REGEX } from "../../const/regex";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { handleLogin } from "../../store/reducer/authReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data && !loading.login) {
      // setLoading(true);
      // handleLogin?.(data, () => {
      // 	setTimeout(() => {
      // 		setLoading(false);
      // 	}, 300);
      // });
      try {
        dispatch(handleLogin(data)).unwrap();
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  return (
    <>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username or email address "
          name="email"
          rest={{
            ...register("email", {
              required: "Please enter your email!",
              pattern: {
                value: REGEX.email,
                message: "Please enter a valid email!",
              },
            }),
          }}
          error={errors?.email?.message}
        />
        <Input
          label="Password "
          type="password"
          rest={{
            ...register("password", {
              required: "Please enter your password!",
            }),
          }}
          error={errors?.password?.message}
        />
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
