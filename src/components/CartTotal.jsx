// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../utils/Utilities";
import { BsTruck } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const CartTotal = () => {
  const { cartItems, cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );
  return (
    <div
      style={{ gridArea: "cart-total" }}
      className="w-full h-full max-w-[1200px] mx-auto border-[1px] border-tom-500 text-tom-950 max-h-fit
          rounded-2xl p-4 flex flex-col gap-2 justify-between items-center divide-y divide-tom-500"
    >
      {/* Order Summary */}
      <div className="flex flex-col gap-2 w-full py-2">
        <h1 className="text-2xl font-medium">Order Summary</h1>
        <ul>
          {cartItems.map((item) => {
            const title = "x" + item.amount + " " + item.title;
            const color = "#" + item.cartID.split("#")[1];
            const price = item.price * item.amount;
            return (
              <ListItem
                key={item.cartID}
                title={title}
                color={color}
                price={price}
              />
            );
          })}
        </ul>
      </div>

      {/* Shipping Charge */}
      <div className="flex flex-col gap-2 w-full py-2">
        <ListItem title="Delivery Charge" price={shipping} />
        <p className="text-sm flex gap-2 items-center">
          <BsTruck className="w-4 h-4" /> Milky Express
        </p>
        <p className="text-sm flex gap-2 items-center mt-[-5px]">
          <IoLocationOutline className="w-4 h-4" />{" "}
          <span className="text-[#7a7b7e]">Deliver to</span> Mars, Solar City
        </p>
      </div>

      {/* Tax and Total */}
      <div className="flex flex-col gap-2 w-full py-2">
        <ul>
          <ListItem title="Amount" price={cartTotal + shipping} />
          <ListItem title="Tax" price={tax} />
        </ul>
      </div>

      {/* Order Total */}
      <div className="flex justify-between items-center gap-2 w-full py-2 text-xl">
        <h1 className="text-sm font-medium">Order Total</h1>
        <p>{formatPrice(orderTotal)}</p>
      </div>

      {/* Checkout Button */}
      <div className="flex flex-col gap-2 w-full pt-4">
        <NavLink
          className="w-full py-2 rounded-xl text-tom-700 border-[1px] border-tom-500 
        hover:bg-tom-700 hover:text-tom-50 duration-150 text-center"
          to="/checkout"
        >
          Checkout
        </NavLink>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ListItem = ({ title, color, price }) => {
  return (
    <li className="flex justify-between">
      <p className="text-sm font-light text-[#7a7b7e] capitalize flex gap-2 items-center">
        {title}
        {color && (
          <span
            className={`w-[11px] h-[11px] rounded-full border border-tom-500`}
            style={{ backgroundColor: color }}
          ></span>
        )}
      </p>
      <p className="text-sm font-light capitalize">{formatPrice(price)}</p>
    </li>
  );
};

export default CartTotal;
