/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { HiMiniMinus, HiMiniMinusSmall, HiMiniPlus } from "react-icons/hi2";
import { TiMinus } from "react-icons/ti";

// eslint-disable-next-line react/prop-types
const PlusMinusInputButton = ({ count, setCount, type }) => {
  function incrementCount() {
    count = count + 1;
    if (count > 5) {
      count = 5;
    }
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    if (count < 1) {
      count = 1;
    }
    setCount(count);
  }
  return (
    <div
      className={`flex items-center rounded-lg  text-sm
        border-[1px] border-tom-700 ${
          type === "cart" ? "p-1 gap-2" : "gap-4 p-2"
        } lg:gap-4 lg:p-2`}
    >
      <button onClick={decrementCount}>
        <HiMiniMinusSmall />
      </button>
      <div>{count}</div>
      <button onClick={incrementCount}>
        <HiMiniPlus />
      </button>
    </div>
  );
};

export default PlusMinusInputButton;
