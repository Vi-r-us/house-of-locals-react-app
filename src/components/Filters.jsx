/* eslint-disable no-unused-vars */
import React from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { TbFilterOff } from "react-icons/tb";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import FormSelect from "../utils/FormSelect";
import FormRange from "../utils/FormRange";
import FormCheckbox from "../utils/FormCheckbox";

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { search, category, company, order, price, shipping } = params;
  return (
    <form
      className="w-full rounded-2xl p-4 lg:p-6 xl-p-8 grid gap-2 items-center
      text-tom-800 border-[1px] border-tom-500 filter-form"
    >
      {/* Search Box */}
      <div
        className="flex items-center gap-2 text-tom-800 flex-1
        border-[1px] border-tom-500 bg-serenade-100 rounded-xl p-2"
        style={{ gridArea: "search-box" }}
      >
        <CiSearch className="w-6 h-6" />
        <input
          name="search"
          type="search"
          defaultValue={search}
          placeholder="Search Product"
          className="bg-serenade-100 w-full focus:outline-none"
        />
      </div>

      {/* Select Category */}
      <FormSelect
        name="category"
        defaultValue={category}
        list={meta.categories}
        gridAreaName={"category"}
      />

      {/* Select Company */}
      <FormSelect
        name="company"
        defaultValue={company}
        list={meta.companies}
        gridAreaName={"company"}
      />

      {/* Select Order */}
      <FormSelect
        name="order"
        defaultValue={order}
        list={["a-z", "z-a", "high", "low"]}
        gridAreaName={"order"}
      />

      {/* Price Range */}
      <FormRange
        name="price"
        price={price}
        gridAreaName={"price-range"}
      />

      {/* Free Shipping Checkbox */}
      <FormCheckbox
        name="shipping"
        defaultValue={shipping}
        gridAreaName={"free-shipping"}
      />

      {/* Clear Filter Button */}
      <NavLink
        className="flex items-center justify-center gap-2 text-tom-800 h-fit
        border-[1px] border-tom-500 bg-serenade-100 rounded-xl p-2 pr-4"
        to={"/products"}
        style={{ gridArea: "clear-button" }}
      >
        <TbFilterOff className="w-6 h-6" />
        <span>Clear</span>
      </NavLink>

      {/* Search Button */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 text-tom-800 h-fit
        border-[1px] border-tom-500 bg-serenade-100 rounded-xl p-2 pr-4"
        style={{ gridArea: "search-button" }}
      >
        <CiSearch className="w-6 h-6" />
        <span>Search</span>
      </button>
    </form>
  );
};

export default Filters;
