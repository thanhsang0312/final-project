import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import styled from "styled-components";

const InputNumberStyle = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  appearance: textfield;
  -moz-appearance: textfield; //Firefox
`;

const ProductQuantity = (
  { className, defaultValue, min = 1, max = 10, step = 1, onChange, ...props },
  ref
) => {
  const [currentQuantity, setCurrentQuantity] = useState(defaultValue ?? 1);

  useImperativeHandle(ref, () => {
    return {
      value: currentQuantity,
      reset: () => {
        setCurrentQuantity(defaultValue ?? 1);
      },
    };
  });

  useEffect(() => {
    onChange?.(currentQuantity);
  }, [currentQuantity]);

  const onInputChange = (e) => {
    setCurrentQuantity(
      e.target.value !== "" ? _modifyValue(Number(e.target.value)) : ""
    );
    // setCurrentQuantity(_modifyValue(Number(e.target.value)));
  };

  const onInputBlur = () => {
    if (currentQuantity === "") {
      setCurrentQuantity(defaultValue);
    }
  };

  const onIncrease = () => {
    const value = _modifyValue(Number(currentQuantity) + Number(step));
    setCurrentQuantity(value);
  };

  const onDecrease = () => {
    const value = _modifyValue(Number(currentQuantity) - Number(step));
    setCurrentQuantity(value);
  };

  const _modifyValue = (value) => {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    } else {
      return value;
    }
  };

  return (
    <div className="input-group input-spinner">
      <div className="input-group-prepend">
        <button className="btn btn-decrement btn-spinner" onClick={onDecrease}>
          <i className="icon-minus"></i>
        </button>
      </div>
      <InputNumberStyle
        type="number"
        className="form-control"
        id="qty"
        max={max}
        value={currentQuantity}
        onChange={onInputChange}
        onBlur={onInputBlur}
        style={{ textAlign: "center" }}
        {...props}
      />
      <div className="input-group-append">
        <button
          className="btn btn-increment btn-spinner"
          type="button"
          style={{ minWidth: 26 }}
          onClick={onIncrease}
        >
          <i className="icon-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default forwardRef(ProductQuantity);
