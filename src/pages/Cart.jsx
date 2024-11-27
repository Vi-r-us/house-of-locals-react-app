/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CartItemsList from "../components/CartItemsList";
import CartTotal from "../components/CartTotal";
import { useSelector } from "react-redux";
import cartImage from "../assets/cart.png";
import CartHeader from "../components/CartHeader";
import Footer from "../components/Footer";

const Cart = () => {
  const user = null;
  const [navbarHeight, setNavbarHeight] = useState(0);

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  return (
    <main
      className="flex flex-col max-w-[1200px] gap-3"
      style={{ paddingTop: `${navbarHeight + 16}px` }}
    >
      <Navbar navbarHeight={navbarHeight} setNavbarHeight={setNavbarHeight} />

      {numItemsInCart < 1 ? (
        <CartEmpty />
      ) : (
        <section className="w-full max-w-[1200px] grid gap-2 cart">
          <CartHeader />
          <CartItemsList />
          <CartTotal />
        </section>
      )}

      <Footer />
    </main>
  );
};

export const CartEmpty = () => {
  return (<section
    className="w-full grid gap-2 p-4 pb-8 mx-auto max-w-[1600px] overflow-hidden
    border-[1px] border-tom-500 rounded-2xl place-content-center"
  >
    <img
      src={cartImage}
      alt="Empty Cart"
      className="max-w-[300px] max-h-[300px]"
    />
    <h1 className="text-4xl font-medium text-center">No items in cart</h1>
  </section>);
}

export default Cart;
