/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const FormSelect = ({ name, list, defaultValue, gridAreaName }) => {
  return (
    <select
      style={{ gridArea: gridAreaName, textAlignLast: "center" }}
      name={name}
      id={name}
      defaultValue={defaultValue}
      className="flex items-center gap-2 text-tom-800 flex-1 border-[1px]
        border-tom-500 bg-serenade-100 rounded-xl p-2 px-4 pr-6 cursor-pointer"
    >
      {list.map((ele) => (
        <option key={ele} value={ele} className="text-tom-800 bg-serenade-100">
          {optionAllName(name, ele)}
        </option>
      ))}
    </select>
  );
};

const optionAllName = (name, value) => {
  if (name === "category") {
    return value === "all" ? "All Categories" : value;
  } else if (name === "company") {
    return value === "all" ? "All Companies" : value;
  } else {
    return `Sort By: ${value}`;
  }
};

export default FormSelect;
