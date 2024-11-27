/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PlusMinusInputButton from "../utils/PlusMinusInputButton";
import { formatPrice } from "../utils/Utilities";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeItem, updateItem } from "../features/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const {
    cartID,
    image,
    title,
    price,
    amount,
    category,
    company,
    productColor,
  } = item;
  const [count, setCount] = useState(amount);

  const removeItemFromTheCart = () => {
    dispatch(removeItem({ cartID }));
  };

  const handleAmount = (count) => {
    setCount(count);
    dispatch(updateItem({ cartID, amount: count }));
  };

  return (
    <li className="text-4xl py-4 border-tom-500 flex gap-4 overflow-visible">
      <figure className="w-[25%] aspect-square ">
        <img
          src={image}
          className="object-cover w-full h-full rounded-lg"
          alt={title}
        />
      </figure>

      <div className="flex flex-col justify-between w-[75%] gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-between items-start">
            <h1 className="text-xl lg:text-3xl text-tom-950 capitalize">
              {title}
            </h1>
            <div
              className="flex justify-between items-center 
              text-xs lg:text-lg text-[#838386] divide-x"
            >
              <p className="px-1">{category}</p>
              <p className="px-1">{company}</p>
              <p className="px-1">Color: </p>
              <span
                className="w-3 h-3 lg:w-4 lg:h-4 px-1 rounded-full border border-tom-950"
                style={{ backgroundColor: productColor }}
              ></span>
            </div>
          </div>
          <button
            className="text-tom-950 hover:text-serenade-800 duration-150"
            onClick={removeItemFromTheCart}
          >
            <MdDelete className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <PlusMinusInputButton count={count} setCount={handleAmount} type={"cart"} />
          <p className="text-sm lg:text-xl text-tom-950">
            {formatPrice(price * count)}
          </p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
