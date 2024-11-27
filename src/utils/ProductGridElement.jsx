/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  MdOutlineAddShoppingCart,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { formatPrice } from "./Utilities";
import { NavLink } from "react-router-dom";
import { addItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductGridElement = ({ product }) => {
  const { title, price, image, category, company, colors } = product.attributes;
  const dollarsAmount = formatPrice(price);

  const cartProduct = {
    cartID: product.id + colors[0],
    productID: product.id,
    image,
    title,
    price,
    amount: 1,
    productColor: colors[0],
    company,
    category,
  };

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <div
      to={`/products/${product.id}`}
      className="bg-serenade-50 flex flex-col gap-4 p-4 lg:p-6 xl-p-8"
    >
      <figure className="overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          className="w-full aspect-square object-cover hover:scale-105 duration-200"
        />
      </figure>

      <div
        className="rounded-2xl p-2 flex items-center gap-2 bg-gradient-to-r 
        from-tom-400 to-tom-100 border-[1px] border-tom-500 text-tom-900"
      >
        <div className="font-normal text-base">
          <h2 className="capitalize tracking-wider">{title}</h2>
          <span className="font-light text-sm">{dollarsAmount}</span>
        </div>

        <NavLink
          to={`/products/${product.id}`}
          className="ml-auto bg-tom-400 p-2 rounded-xl hover:bg-tom-500 duration-150 relative group"
        >
          <MdOutlineKeyboardDoubleArrowRight className="w-6 h-6" />
          <span
            className="absolute w-[45px] left-0 right-0 bottom-full  hidden mb-2 text-[14px] font-thin
              text-center bg-tom-800  text-tom-50 px-1 rounded-lg group-hover:block"
          >
            View
          </span>
        </NavLink>

        <button
          type="button"
          className=" bg-tom-400 p-2 rounded-xl hover:bg-tom-500 duration-150 relative group"
          onClick={addToCart}
        >
          <MdOutlineAddShoppingCart className="w-6 h-6" />
          <span
            className="absolute w-[90px] left-[-30px] right-0 bottom-full  hidden mb-2 text-[14px] font-thin
              bg-tom-800 text-center text-tom-50 px-1 rounded-lg group-hover:block"
          >
            Add to Cart
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductGridElement;
