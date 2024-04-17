import React from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { REGEX } from "../../const/regex";
import { message } from "antd";
import { subscribeService } from "../../services/subscribeServices";
import styled from "styled-components";
import TextArea from "../../components/TextArea";

const ContactFormWrapper = styled.form`
  .row {
    .col-sm-6:first-child {
      /* margin-left: -10px; */
    }
  }
`;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      <ContactFormWrapper action="#" className="contact-form mb-3">
        <div className="row">
          <div className="col-sm-6">
            <label className="sr-only">Name</label>
            <Input
              type="text"
              placeholder="Name *"
              rest={{
                ...register("name", {
                  required: "Please enter your name!",
                }),
              }}
              error={errors?.name?.message}
            />
          </div>
          <div className="col-sm-6">
            <label className="sr-only">Email</label>
            <Input
              type="text"
              placeholder="Email *"
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
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label className="sr-only">Phone</label>
            <Input
              type="text"
              placeholder="Phone number *"
              rest={{
                ...register("phone", {
                  required: "Please enter your phone number!",
                  pattern: {
                    value: REGEX.phone,
                    message: "Please enter correct your number phone!",
                  },
                }),
              }}
              error={errors?.phone?.message}
            />
          </div>
          <div className="col-sm-6">
            <label className="sr-only">Subject</label>
            <Input type="text" placeholder="Subject" />
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
      </ContactFormWrapper>
    </div>
  );
};

export default ContactForm;
