/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  MdOutlineAddShoppingCart,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { formatPrice, getFillerDivsCount } from "../utils/Utilities";
import ProductGridElement from "../utils/ProductGridElement";
import { useSelector } from "react-redux";

const FeaturedProducts = () => {
  const windowWidth = useSelector((state) => state.windowState.width);
  const { products } = useLoaderData();

  return (
    <section
      className="w-full border-[1px] border-tom-500 rounded-2xl
        product-grid overflow-hidden"
    >
      <div className="flex flex-col bg-serenade-50 p-4 lg:p-6 xl-p-8 text-center 
        lg:justify-between text-tom-800">
        <h1 className="text-4xl lg:text-5xl">Our Best Sellers</h1>
        <h5 className="text-sm lg:text-lg font-light mt-2">
          Explore what other customers liked the most from us:)
        </h5>
      </div>

      {products.map((product) => (
        <ProductGridElement key={product.id} product={product} />
      ))}

      {/* Filler */}
      {getFillerDivsCount(windowWidth, products.length + 1).map((_, index) => (
        <div key={index} className="bg-serenade-50"></div>
      ))}
    </section>
  );
};



export default FeaturedProducts;
