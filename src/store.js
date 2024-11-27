import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
import windowReducer from "./features/utils/windowSlice";
import navbarReducer from "./features/utils/navbarSlice";

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
    windowState: windowReducer,
    navbarState: navbarReducer,
  },
});
