/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    /**
     * Adds an item to the cart.
     * @param {object} state - The state of the cart.
     * @param {object} action - The action payload.
     * @param {object} action.payload - The product to add to the cart.
     * @param {string} action.payload.product.cartID - The cart ID of the product.
     * @param {number} action.payload.product.amount - The amount of the product to add.
     * @param {number} action.payload.product.price - The price of the product.
     */
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);

      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item added");
    },

    /**
     * Clears the cart by setting the state to the default state.
     * @param {object} state - The state of the cart.
     */
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },

    /**
     * Removes an item from the cart.
     * @param {object} state - The state of the cart.
     * @param {object} action - The action payload.
     * @param {string} action.cartID - The cart ID of the item to remove.
     */
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);

      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed");
    },

    /**
     * Updates the amount of an item in the cart.
     * @param {object} state - The state of the cart.
     * @param {object} action - The action payload.
     * @param {string} action.cartID - The cart ID of the item to update.
     * @param {number} action.amount - The new amount of the item.
     */
    updateItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item updated");
    },

    /**
     * Calculates the total cost of the items in the cart including tax and shipping
     * then saves the state to local storage
     *
     * @param {object} state - The state of the cart
     */
    calculateTotals: (state) => {
      state.tax = state.cartTotal * 0.1;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, updateItem } = cartSlice.actions;
export default cartSlice.reducer;
