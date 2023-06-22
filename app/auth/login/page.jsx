import React from "react";
import LoginForm from "../../_components/LoginForm";
import H3Title from "../../_components/H3Title";

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <H3Title text={"Login"} />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
