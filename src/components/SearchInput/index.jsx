import { Select } from "antd";
import React, { useState } from "react";
import Input from "../Input";

const SearchInput = ({ ...props }) => {
  let timeout;
  let currentValue;
  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  const handleSearch = () => {};
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return <Input type="search" />;
};

export default SearchInput;
