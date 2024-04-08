import React from "react";

const Input = ({
  label,
  required,
  error,
  renderInput,
  type = "text",
  rest,
}) => {
  return (
    <div className="form-group">
      <label className="label">{label}</label>
      {renderInput?.({ ...rest, error }) || (
        <input
          type={type}
          {...rest}
          className={`form-control ${error ? "input-error" : ""}`}
        />
      )}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default Input;
