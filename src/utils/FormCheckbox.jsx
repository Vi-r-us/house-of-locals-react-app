/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";

const FormCheckbox = ({ name, defaultValue, gridAreaName }) => {
  const [isChecked, setIsChecked] = useState(defaultValue || false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label
      className="w-full themeSwitcherTwo shadow-card relative inline-flex cursor-pointer 
        select-none items-center justify-center bg-white text-tom-800 border-[1px]
        border-tom-500 bg-serenade-100 rounded-xl p-2 px-4"
      style={{ gridArea: gridAreaName }}
    >
      <input
        name={name}
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        value={isChecked}
        onChange={handleCheckboxChange}
      />
      <span
        className={`flex items-center space-x-[6px] rounded-lg py-2 px-[18px] text-sm font-medium ${
          !isChecked ? "text-primary bg-serenade-200" : "text-body-color hover:scale-105"
        } gap-2 text-center duration-150`}
      >
        <img
          src="https://static.thenounproject.com/png/246816-200.png"
          className="max-w-6 max-h-6"
        />
        No Shipping
      </span>
      <span
        className={`flex items-center space-x-[6px] rounded-lg py-2 px-[18px] text-sm font-medium ${
          isChecked ? "text-primary bg-serenade-200" : "text-body-color hover:scale-105"
        } gap-2 text-center duration-150`}
      >
        <LiaShippingFastSolid className="min-w-6 min-h-6" />
        Free Shipping
      </span>
    </label>
  );
};

export default FormCheckbox;
