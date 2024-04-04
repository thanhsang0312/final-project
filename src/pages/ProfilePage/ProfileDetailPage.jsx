import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { set, useForm } from "react-hook-form";
import { message } from "antd";

const ProfileDetailPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("errors", errors);
  const { profile, handleUpdateProfile } = useAuthContext();
  const initialInfo = useRef({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    facebookURL: "",
    wesite: "",
    introduce: "",
    birthday: "",
    street: "",
    province: "",
    district: "",
    ward: "",
    password: "",
    newPassword: "",
    image: "",
  });

  const _onSubmit = (data) => {
    console.log(data);
    if (!isFormChanged) return;
    message.success("Update profile successfully!");
  };

  return (
    <div
      className="tab-pane fade show active"
      id="tab-account"
      role="tabpanel"
      aria-labelledby="tab-account-link"
    >
      <form action="#" className="account-form">
        <div className="row">
          <div className="col-sm-6">
            <label>Full Name *</label>
            <input
              type="text"
              className={`form-control ${errors?.name ? "input-error" : ""}`}
              defaultValue="Tran"
              {...register("name", {
                required: "Please enter your name!",
              })}
            />
            {errors?.name?.message && (
              <p className="form-error">{errors?.name?.message}</p>
            )}
          </div>
          <div className="col-sm-6">
            <label>Email address *</label>
            <input
              type="email"
              className="form-control"
              defaultValue="trannghia@gmail.com"
              disabled
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label>Phone number *</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="col-sm-6">
            <label>Ngày sinh *</label>
            <input type="date" className="form-control" required />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <label>Province/City *</label>
            <div className="select-custom">
              <select
                className="form-control form-select"
                id="city"
                aria-label="Default select example"
              >
                <option selected />
              </select>
            </div>
          </div>
          <div className="col-sm-4">
            <label>District/Town *</label>
            <div className="select-custom">
              <select className="form-control form-select" id="district">
                <option selected />
              </select>
            </div>
          </div>
          <div className="col-sm-4">
            <label>Ward *</label>
            <div className="select-custom">
              <select className="form-control form-select" id="ward">
                <option selected />
              </select>
            </div>
          </div>
        </div>
        <label>Street address *</label>
        <input
          type="email"
          className="form-control"
          defaultValue="30 Ba Thang Hai St."
          required
        />
        <label>Current password (leave blank to leave unchanged)</label>
        <input type="password" className="form-control" />
        <label>New password (leave blank to leave unchanged)</label>
        <input type="password" className="form-control" />
        <label>Confirm new password</label>
        <input type="password" className="form-control mb-2" />
        <button
          type="submit"
          className="btn btn-outline-primary-2"
          onClick={handleSubmit(_onSubmit)}
        >
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default ProfileDetailPage;
