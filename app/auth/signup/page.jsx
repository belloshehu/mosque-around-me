import React from "react";
import LoginForm from "../../_components/LoginForm";
import H3Title from "../../_components/H3Title";
import SignupForm from "../../_components/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <H3Title text={"Signup"} />
      <SignupForm />
    </div>
  );
};

export default SignupPage;
