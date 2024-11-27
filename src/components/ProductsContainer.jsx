// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductGridElement from "../utils/ProductGridElement";
import { getFillerDivsCount } from "../utils/Utilities";
import { useSelector } from "react-redux";

const ProductsContainer = () => {
  const windowWidth = useSelector((state) => state.windowState.width);
  const { products } = useLoaderData();
  const { meta, params } = useLoaderData();
  const { category } = params;

  return meta.pagination.total === 0 ? (
    <section
      className="w-full bg-serenade-50 border-[1px] border-tom-500 rounded-2xl 
      overflow-hidden product-grid p-6"
    >
      <h1 className="text-4xl text-tom-900 text-center">No Products Found</h1>
    </section>
  ) : (
    <section
      className="w-full bg-tom-500 border-[1px] border-tom-500 rounded-2xl 
      overflow-hidden product-grid "
    >
      <div
        className="flex flex-col items-center lg:justify-between 
        bg-serenade-50 p-4 lg:p-6 xl-p-8 text-center text-tom-800"
      >
        <div className="flex gap-2">
          <h1 className="text-4xl lg:text-5xl font-light capitalize">
            {category
              ? category === "all"
                ? "All Furniture"
                : category
              : "All Furniture"}
          </h1>
          <h4 className="text-xl lg:text-lg">{meta.pagination.total}</h4>
        </div>
        <h5 className="text-sm lg:text-lg font-light mt-2">
          We have a good catalog of{" "}
          {category
            ? category === "all"
              ? "Furniture"
              : category
            : "Furniture"}{" "}
          for you. Check them out.
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

export default ProductsContainer;
