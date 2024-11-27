/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { formatPrice } from "./Utilities";

const FormRange = ({ name, price, gridAreaName }) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

  return (
    <div
      className="flex flex-col gap-2 text-tom-800 flex-1 border-[1px]
        border-tom-500 bg-serenade-100 rounded-xl p-2 px-4 pr-6"
      style={{ gridArea: gridAreaName }}
    >
      <div className="flex items-center justify-between text-lg">
        <h1>
          <b>Price</b> Range
        </h1>
        <p className="text-sm font-light">{formatPrice(selectedPrice)}</p>
      </div>

      <input
        className="w-full cursor-pointer"
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        step={step}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
      />

      <div className="flex items-center justify-between text-sm font-light">
        <p><b>Min:</b> $0</p>
        <p className=""><b>Max:</b> {formatPrice(maxPrice)}</p>
      </div>
    </div>
  );
};

export default FormRange;
