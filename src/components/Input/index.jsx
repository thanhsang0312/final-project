import React from "react";

const Input = ({ label, required, error, renderInput, ...rest }) => {
  return (
    <div className="form-group">
      <label className="label">
        {label} {required && <span>*</span>}
      </label>
      {renderInput?.({ ...rest, error }) || (
        <input
          {...rest}
          className={`form-control ${error ? "input-error" : ""}`}
        />
      )}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default Input;
