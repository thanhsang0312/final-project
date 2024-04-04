import React from "react";

const Checkbox = ({ label, id, ...rest }) => {
  return (
    <div className="custom-control custom-checkbox">
      <input type="checkbox" className="custom-control-input" id={id} />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
