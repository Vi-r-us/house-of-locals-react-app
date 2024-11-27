/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
// eslint-disable-next-line no-unused-vars
import React from "react";
import UserAuth from "../components/UserAuth";
import LoginComp from "../components/LoginComp";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/Utilities";
import { redirect } from "react-router-dom";
import { loginUser } from "../features/user/userSlice";

/* Lazy Invocation: This function should only be executed when explicitly called, 
  not on app startup. It's a nested function call, and it expects to receive the 
  store as a prop from its parent component, App.jsx. */
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      toast.success("Logged in successfully");
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "Please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  return <UserAuth children={<LoginComp />} />;
};

export default Login;
