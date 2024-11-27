// eslint-disable-next-line no-unused-vars
import { Form, Link, useNavigate } from "react-router-dom";
import FormInput from "../utils/FormInput";
import SubmitButton from "../utils/SubmitButton";
import FormIntro from "../utils/FormIntro";
import RegisterButton from "../utils/RegisterButton";

const LoginComp = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-12 md:col-start-1 max-w-[390px] self-center justify-self-center">
      {/* Intro Component */}
      <FormIntro
        title="👋 Welcome Back"
        subTitle="Today is a new day. It's your day. You shape it. Sign in to get
        started."
      />

      {/* Form Component */}
      <Form method="POST" className="flex flex-col gap-4 md:gap-6">
        <FormInput
          label="Email / Username"
          name="identifier"
          type="text"
          defaultValue="Example@email.com"
          isRequired={true}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          defaultValue="At least 8 characters"
          isRequired={true}
        />

        <SubmitButton text={"Log In"} />

        <RegisterButton />
      </Form>

      <p className="font-light text-center text-base md:text-lg">
        Don&apos;t you have an account? 😥{" "}
        <Link
          to={"/register"}
          className="text-tom-800 underline font-medium cursor-pointer"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginComp;
