import React from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { SORT_OPTION } from "../../const/general";

const ToolboxRightWrapper = styled.div`
  .form-group {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const ProductToolbox = ({ showNumb, totalNumb, activeSort, onSortChange }) => {
  const onSelectChange = (e) => {
    onSortChange?.(e.target.value);
  };

  return (
    <div className="toolbox">
      <div className="toolbox-left">
        <div className="toolbox-info">
          {" "}
          Showing{" "}
          <span>
            {showNumb || 0} of {totalNumb || 0}
          </span>{" "}
          Products{" "}
        </div>
      </div>
      <ToolboxRightWrapper className="toolbox-right">
        <Input
          className="toolbox-sort"
          label="Sort by:"
          renderInput={(inputProps) => {
            return (
              <Select
                defaultValue={SORT_OPTION.popularity.value}
                options={[
                  SORT_OPTION.popularity,
                  SORT_OPTION.pricelow,
                  SORT_OPTION.pricehigh,
                  SORT_OPTION.newest,
                  SORT_OPTION.rating,
                ]}
                {...inputProps}
                value={activeSort}
                onChange={onSelectChange}
              />
            );
          }}
        >
          {/* <label htmlFor="sortby">Sort by:</label>
          <div className="select-custom">
            <select name="sortby" id="sortby" className="form-control">
              <option value="popularity" selected>
                Most Popular
              </option>
              <option value="pricelow">Price Low to High</option>
              <option value="pricehight">Price Hight to Low </option>
              <option value="newest">Newest</option>
              <option value="rating">Most Rated</option>
            </select>
          </div> */}
        </Input>
      </ToolboxRightWrapper>
    </div>
  );
};

export default ProductToolbox;
