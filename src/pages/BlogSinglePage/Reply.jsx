import { message } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";

const Reply = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const _onSubmit = (data) => {
    console.log("data", data);
    message.success("Successfully!");
  };
  return (
    <div className="reply">
      <div className="heading">
        <h3 className="title">Leave A Reply</h3>
        <p className="title-desc">
          Your email address will not be published. Required fields are marked *
        </p>
      </div>
      <form action="#" onSubmit={handleSubmit(_onSubmit)}>
        <label htmlFor="reply-message" className="sr-only">
          Comment
        </label>
        <textarea
          name="reply-message"
          id="reply-message"
          cols={30}
          rows={4}
          className="form-control"
          {...register("mess", {
            required: "Please fill this field!",
          })}
          placeholder="Comment *"
          defaultValue={""}
        />
        <p className="form-error">{errors?.mess?.message}</p>
        <div className="row">
          <div className="col-md-6">
            <Input
              label="Name"
              required
              placeholder="Name *"
              rest={{
                ...register("name", {
                  required: "Please fill this field!",
                }),
              }}
              error={errors?.name?.message}
            />
          </div>
          <div className="col-md-6">
            <Input
              label="Email"
              required
              placeholder="Email *"
              rest={{
                ...register("mail", {
                  required: "Please fill this field!",
                }),
              }}
              error={errors?.mail?.message}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-outline-primary-2">
          <span>POST COMMENT</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default Reply;
