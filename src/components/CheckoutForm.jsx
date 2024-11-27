/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Form, NavLink, redirect } from "react-router-dom";
import { axiosInstance, formatPrice } from "../utils/Utilities";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;
    const name = data.name;
    const address =
      data.address +
      (data.city ? ", " + data.city : "") +
      (data.district ? ", " + data.district : "") +
      (data.state ? ", " + data.state : "");

    // console.log(name, address);
    const info = {
      name,
      address,
      user,
      cartItems,
      numItemsInCart,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
    };

    try {
      const response = await axiosInstance.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      queryClient.removeQueries(["orders"]);
      store.dispatch(clearCart());
      toast.success("Order Placed Successfully");
      return redirect("/orders");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "There was an error placing your order. Please try again.";
      toast.error(errorMessage);
      if (error.response.status === 401) return redirect("/login");
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form
      method="post"
      className="w-full p-6 bg-serenade-50 flex flex-col gap-6"
      style={{ gridArea: "address-section" }}
    >
      {/* Account Details */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium">Account Details</p>
          <p>
            Already have an account?{" "}
            <NavLink to="/login" className="underline">
              Log in
            </NavLink>
          </p>
        </div>

        <Input label="Email Address" name="email" type="email" />
      </div>

      {/* Shipping Address */}
      <div className="grid gap-3 shipping-address-grid">
        <div
          className="flex items-center justify-between mb-1"
          style={{ gridArea: "header" }}
        >
          <p className="font-medium">Shipping Address</p>
        </div>

        <Input
          label="Name"
          name="name"
          type="text"
          gridTemplateArea={"name"}
          isRequired={true}
        />
        <Input
          label="Phone Number"
          name="phone"
          type="text"
          gridTemplateArea={"phone"}
        />
        <Input
          label="Address"
          name="address"
          type="text"
          gridTemplateArea={"address"}
          isLongText={true}
          isRequired={true}
        />
        <Input
          label="City/Locality"
          name="city"
          type="text"
          gridTemplateArea={"city"}
        />
        <Input
          label="District"
          name="district"
          type="text"
          gridTemplateArea={"district"}
        />
        <Input
          label="State"
          name="state"
          type="text"
          gridTemplateArea={"state"}
        />
        <Input
          label="Landmark (Optional)"
          name="landmark"
          type="text"
          gridTemplateArea={"landmark"}
        />
        <Input
          label="Alternative Phone (Optional)"
          name="alternative-phone"
          type="text"
          gridTemplateArea={"alternative-phone"}
        />
      </div>

      <div className="flex justify-between items-center">
        <NavLink className="flex gap-2 items-center" to={"/cart"}>
          <IoIosArrowBack /> Return to cart
        </NavLink>

        <button
          type="submit"
          className="uppercase bg-tom-700 text-tom-50 py-4 px-6 rounded-xl"
        >
          place order
        </button>
      </div>
    </Form>
  );
};

/**
 * @description A reusable input component for CheckoutForm that can be used as
 * a text input or a text area. It also includes a label that is initially
 * absolute positioned at the top left of the input field, when the input field
 * is focused, the label moves up and becomes smaller, and when the input field
 * is not focused and has a value, the label becomes transparent.
 *
 * @param {string} label - The text of the label.
 * @param {string} name - The name of the input field.
 * @param {string} type - The type of the input field, e.g. "text", "email", etc.
 * @param {string} gridTemplateArea - The grid area of the input field.
 * @param {boolean} [isRequired=false] - Whether the input field is required.
 * @param {boolean} [isLongText=false] - Whether the input field should be a
 * text area.
 * @returns {ReactNode} A React component.
 */
const Input = ({
  label,
  name,
  type,
  gridTemplateArea,
  isRequired = false,
  isLongText = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative" style={{ gridArea: gridTemplateArea }}>
      <label>
        {isLongText ? (
          <textarea
            className="text-sm md:text-base w-full font-light bg-serenade-50 
              p-[14px] rounded-xl border-[1px] border-tom-500 peer"
            required={isRequired}
            name={name}
            type={type}
            onChange={handleValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        ) : (
          <input
            className="text-sm md:text-base w-full font-light bg-serenade-50 
              p-[14px] rounded-xl border-[1px] border-tom-500 peer"
            required={isRequired}
            name={name}
            type={type}
            onChange={handleValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
        <span
          className={`absolute top-1/2 -translate-y-1/2 left-[14px] peer-focus:text-xs 
            peer-focus:text-[#818183] peer-focus:top-[10px] duration-150 ${
              value !== "" && !isFocused ? "opacity-0 duration-0" : ""
            }`}
        >
          {label}
        </span>
      </label>
    </div>
  );
};

export default CheckoutForm;
