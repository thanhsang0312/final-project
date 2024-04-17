import React from "react";

const TextArea = ({ error, ...rest }) => {
  return (
    <textarea
      cols={30}
      rows={4}
      id="cmessage"
      className={`form-control ${error ? "input-error" : ""}`}
      {...rest}
    />
  );
};

export default TextArea;
