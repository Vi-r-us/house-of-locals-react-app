// eslint-disable-next-line no-unused-vars
import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cartState).cartItems;
  return (
    <ul
      role="list"
      style={{ gridArea: "cart-items" }}
      className="w-full border-[1px] border-tom-500 divide-y 
          rounded-2xl flex flex-col px-4 max-h-fit"
    >
      {cartItems.map((item) => (
        <CartItem key={item.cartID} item={item} />
      ))}
    </ul>
  );
};

export default CartItemsList;
