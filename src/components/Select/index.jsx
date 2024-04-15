import React from "react";

const Select = ({ options, error, className = "select-custom", ...rest }) => {
  return (
    <div className={className}>
      <select
        {...rest}
        className={`form-control ${!!error ? "input-error" : ""}`}
      >
        {options?.map((option, index) => (
          <option key={option?.value || index} value={option?.value}>
            {option?.label || ""}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
