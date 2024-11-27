/* eslint-disable no-unused-vars */
import React from "react";
import FormInput from "../utils/FormInput";
import SubmitButton from "../utils/SubmitButton";
import FormIntro from "../utils/FormIntro";
import { Form, Link } from "react-router-dom";
import RegisterButton from "../utils/RegisterButton";

const RegisterComp = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-12 md:col-start-1 max-w-[390px] self-center justify-self-center">
      {/* Intro Component */}
      <FormIntro
        title="🚀 Create Account"
        subTitle="Join the community and start exploring the world of local products."
      />

      {/* Form Component */}
      <Form method="post" className="flex flex-col gap-4 md:gap-6">
        <FormInput
          label="Username"
          name="username"
          type="text"
          defaultValue="Enter your username"
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          defaultValue="Example@email.com"
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          defaultValue="At least 8 characters"
        />

        <SubmitButton text="Register" />

        <RegisterButton />
      </Form>

      <p className="font-light text-center text-base md:text-lg">
        Already have an account? 👉{" "}
        <Link
          to="/login"
          className="text-tom-800 underline font-medium cursor-pointer"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterComp;
