import React, { createContext, useContext, useEffect, useState } from "react";

const RadioContext = createContext();

const RadioGroup = ({
  defaultValue,
  disabled,
  className,
  onChange,
  children,
}) => {
  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onCheckChange = (e) => {
    const value = e.target.value;
    setValue(value);
    onChange?.(value);
  };

  return (
    <RadioContext.Provider
      value={{ value, disabled, onCheckChange }}
      className={`radio-group ${className}`}
    >
      {children}
    </RadioContext.Provider>
  );
};

const RadioItem = ({ children, disabled = false, value }) => {
  const { value: selectedValue, onCheckChange } = useContext(RadioContext);
  console.log(selectedValue, value);
  return (
    <div className="custom-control custom-radio">
      <input
        className="custom-control-input"
        type="radio"
        id={value}
        name={value}
        checked={selectedValue === value}
        disabled={disabled}
        value={value}
        onChange={(e) => onCheckChange(e)}
      />
      <label
        className="custom-control-label"
        htmlFor={value}
        style={{ cursor: "pointer" }}
      >
        {children}
      </label>
    </div>
  );
};

RadioGroup.Item = RadioItem;

export default RadioGroup;
