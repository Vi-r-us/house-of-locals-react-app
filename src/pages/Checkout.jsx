/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { formatPrice } from "../utils/Utilities";
import { redirect } from "react-router-dom";
import { CartEmpty } from "./Cart";
import { toast } from "react-toastify";
import  CheckoutForm  from "../components/CheckoutForm";

export const Loader = (store) => () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn("Please login to continue");
    return redirect("/login");
  }

  return null;
};

const Checkout = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  return (
    <main
      className="flex flex-col max-w-[1200px] gap-4"
      style={{ paddingTop: `${navbarHeight + 16}px` }}
    >
      <Navbar navbarHeight={navbarHeight} setNavbarHeight={setNavbarHeight} />

      {numItemsInCart < 1 ? (
        <CartEmpty />
      ) : (
        <section
          className="w-full border-[1px] border-tom-500 rounded-2xl overflow-hidden
          grid gap-[1px] bg-tom-500 checkout-grid
          text-tom-800 font-light text-sm"
        >
          <CheckoutForm />
          <DeliveryPolicySection />
          <ProductSummarySection />
        </section>
      )}

      <Footer />
    </main>
  );
};

const ProductSummarySection = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );
  const cartItems = useSelector((state) => state.cartState).cartItems;
  return (
    <div
      className="w-full p-6 bg-serenade-50 flex flex-col divide-y
      md:flex-row md:divide-x md:divide-y-0 lg:flex-col lg:divide-x-0 lg:divide-y"
      style={{ gridArea: "product-summary-section" }}
    >
      {/* Products */}
      <ul className="flex flex-col gap-6 pb-6 md:w-[60%] lg:w-full md:pr-4 lg:pr-0">
        {cartItems.map((item) => {
          const { cartID, image, title, amount } = item;
          return (
            <li key={cartID} className="flex gap-4 items-center">
              <figure className="w-[17.5%] aspect-square relative">
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src={image}
                  alt="title"
                />
                <figcaption
                  className="grid place-items-center rounded-[50%] w-6 h-6
                  bg-tom-700 text-tom-50 absolute bottom-[-6px] right-[-6px]"
                >
                  {amount}
                </figcaption>
              </figure>

              <p className="capitalize font-bold">{title}</p>

              <p className="ml-auto">{formatPrice(item.price * item.amount)}</p>
            </li>
          );
        })}
      </ul>

      {/* Summary */}
      <div className="flex flex-col divide-y md:w-[40%] md:pl-4 lg:pl-0 lg:w-full">
        <ul className="flex flex-col justify-between py-4 gap-1">
          <li className="flex justify-between">
            <p className="font-medium">Subtotal</p>
            <p className="font-light">{formatPrice(cartTotal)}</p>
          </li>

          <li className="flex justify-between">
            <p className="font-medium">Delivery</p>
            <p className="font-light">{formatPrice(shipping)}</p>
          </li>

          <li className="flex justify-between">
            <p className="font-medium">Taxes</p>
            <p className="font-light">{formatPrice(tax)}</p>
          </li>
        </ul>

        {/* Total */}
        <div className="flex justify-between text-lg items-center w-full pt-4">
          <p className=" font-medium">To Pay</p>
          <p>{formatPrice(orderTotal)}</p>
        </div>
      </div>
    </div>
  );
};

const DeliveryPolicySection = () => {
  return (
    <div
      className="w-full p-6 bg-serenade-50 flex flex-col md:flex-row gap-6"
      style={{ gridArea: "delivery-policy-section" }}
    >
      <article className="flex flex-col gap-2">
        <p className="font-bold">Shipping</p>
        <p>
          We ship all over the world. For that matter we have partnered with
          major courier services such as DHL. FedEx etc. Read more in{" "}
          <a className="underline" href="#">
            shipping policy
          </a>
        </p>
      </article>

      <article className="flex flex-col gap-2">
        <p className="font-bold">Return Policy</p>
        <p>
          Return is not applicable for this product. If damaged product was
          delivered and you have video proof, you are applicable for full
          refund.{" "}
          <a className="underline" href="#">
            Contact us to avail refund.
          </a>
        </p>
      </article>
    </div>
  );
};

export default Checkout;
