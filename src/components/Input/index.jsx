import React from "react";

const Input = ({
  label,
  required,
  error,
  renderInput,
  type = "text",
  rest,
  placeholder,
}) => {
  return (
    <div className="form-group">
      <label className="label">{label}</label>
      {renderInput?.({ ...rest, error }) || (
        <input
          type={type}
          {...rest}
          className={`form-control ${error ? "input-error" : ""}`}
          placeholder={placeholder}
        />
      )}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default Input;
