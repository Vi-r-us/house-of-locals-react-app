// eslint-disable-next-line no-unused-vars
import React from "react";
import UserAuth from "../components/UserAuth";
import RegisterComp from "../components/RegisterComp";
import { axiosInstance } from "../utils/Utilities";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    // eslint-disable-next-line no-unused-vars
    const response = await axiosInstance.post("/auth/local/register", data);
    toast.success("Account created");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "Please double check your credentials";
    toast.error(errorMessage || "Please double check your credentials");
    return null;
  }
};

const Register = () => {
  // eslint-disable-next-line react/no-children-prop
  return <UserAuth children={<RegisterComp />} />;
};

export default Register;
