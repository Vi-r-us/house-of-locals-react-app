/* eslint-disable no-unused-vars */
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

const CartHeader = () => {
  const dispatch = useDispatch();
  const clearAllItemFromCart = () => {
    dispatch(clearCart());
  };

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  return (
    <div
      style={{ gridArea: "cart-header" }}
      className="w-full mx-auto border-[1px] border-tom-500
          rounded-2xl p-4 flex gap-2 justify-between items-center"
    >
      <span className="flex gap-2">
        <h1 className="text-4xl font-medium">My Cart</h1>
        <p className="font-light mt-[-5px] text-sm">[{numItemsInCart}]</p>
      </span>

      <button
        className=" rounded-lg border-[1px] border-tom-500 px-2 py-1 
          text-sm font-light flex gap-2 items-center hover:bg-serenade-800
        hover:text-tom-50 duration-150"
        onClick={clearAllItemFromCart}
      >
        <IoIosCloseCircleOutline className="w-4 h-4" /> Clear Cart
      </button>
    </div>
  );
};

export default CartHeader;
