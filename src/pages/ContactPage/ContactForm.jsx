import React from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { REGEX } from "../../const/regex";
import { message } from "antd";
import { subscribeService } from "../../services/subscribeServices";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("error", errors);

  const onSubmit = async (data) => {
    console.log(data);
    message.success("Submit succesfully!");
    try {
      const res = await subscribeService.subscribe({
        ...data,
        title: "",
        description: "",
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="col-lg-6">
      <h2 className="title mb-1">Got Any Questions?</h2>
      <p className="mb-2">
        Use the form below to get in touch with the sales team
      </p>
      <form action="#" className="contact-form mb-3">
        <div className="row">
          <div className="col-sm-6">
            <label className="sr-only">Name</label>
            <input
              type="text"
              className={`form-control ${
                errors?.name?.message ? "input-error" : ""
              }`}
              // id="cname"
              placeholder="Name *"
              {...register("name", { required: "Please enter your name!" })}
            />
            {errors?.name?.message && (
              <p className="form-error">{errors?.name?.message}</p>
            )}
          </div>
          <div className="col-sm-6">
            <label className="sr-only">Email</label>
            <input
              type="email"
              className="form-control"
              // id="cemail"
              placeholder="Email *"
              {...register("email", {
                required: "Please enter your email!",
                pattern: {
                  value: REGEX.email,
                  message: "Please enter a valid email!",
                },
              })}
            />
            {errors?.email?.message && (
              <p className="form-error">{errors?.email?.message}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label className="sr-only">Phone</label>
            <input
              type="tel"
              className="form-control"
              // id="cphone"
              placeholder="Phone"
              {...register("phone", {
                required: "Please enter your phone number!",
                pattern: {
                  value: REGEX.phone,
                  message: "Please enter a valid phone number",
                },
              })}
            />
            {errors?.phone?.message && (
              <p className="form-error">{errors?.phone?.message}</p>
            )}
          </div>
          <div className="col-sm-6">
            <label className="sr-only">Subject</label>
            <input type="text" className="form-control" placeholder="Subject" />
          </div>
        </div>
        <div className="row">
          <label htmlFor="cmessage" className="sr-only">
            Message
          </label>
          <textarea
            className="form-control"
            cols={30}
            rows={4}
            id="cmessage"
            placeholder="Message *"
            defaultValue={""}
            {...register("message", {
              required: "Please fill this field!",
            })}
          />
          {errors?.message?.message && (
            <p className="form-error">{errors?.message?.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary-2 btn-minwidth-sm"
          onClick={handleSubmit(onSubmit)}
        >
          <span>SUBMIT</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
