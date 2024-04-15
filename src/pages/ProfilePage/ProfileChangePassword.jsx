import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { authService } from "../../services/authServices";
import { message } from "antd";
import Input from "../../components/Input";

const ProfileChangePassword = () => {
  const { profile } = useSelector((state) => state.auth);
  const password = useRef();
  const newPassword = useRef();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  newPassword.current = watch("newPassword", "");
  password.current = watch("password", "");

  const _onSubmit = async (data) => {
    try {
      const res = await authService.updateProfile({ ...profile, ...data });
      if (res) {
        message.success("Change password success!");
      }
    } catch (error) {
      console.log("error", error);
      message.error("Change password failed!");
    }
  };
  return (
    <div className="tab-pane face active show">
      <form className="account-form" onSubmit={handleSubmit(_onSubmit)}>
        {/* <label>Current password (leave blank to leave unchanged)</label>
        <input type="password" className="form-control" /> */}
        <Input
          type="password"
          label="Current password (leave blank to leave unchanged)"
          required
          defaultValue={null}
          rest={{
            ...register("password", {
              required: "Please enter current password!",
            }),
          }}
          error={errors?.password?.message}
        />
        {/* <label>New password (leave blank to leave unchanged)</label>
        <input type="password" className="form-control" /> */}
        <Input
          type="password"
          label="New password (leave blank to leave unchanged)"
          required
          defaultValue={null}
          rest={{
            ...register("newPassword", {
              validate: (value) =>
                value !== password.current ||
                "New password must be different from current password!",
            }),
          }}
          error={errors?.newPassword?.message}
        />
        {/* <label>Confirm new password</label>
        <input type="password" className="form-control mb-2" /> */}
        <Input
          type="password"
          label="Confirm new password"
          required
          rest={{
            ...register("cpassword", {
              validate: (value) =>
                value === newPassword.current || "Password does not match!",
            }),
          }}
          error={errors?.cpassword?.message}
        />

        <button type="submit" className="btn btn-outline-primary-2">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default ProfileChangePassword;
