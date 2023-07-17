"use client";
import SendVerificationCodeForm from "../../../_components/SendVerificationCodeForm";

export const metadata = {
  title: "email verification code",
};

const SendVerificationCodePage = ({ params }) => {
  const { verificationType } = params;
  return (
    <div className=" flex-1 py-auto py-10 pb-auto flex flex-col justify-center items-center">
      <SendVerificationCodeForm
        form_heading={
          verificationType === "email" ? "Email verification" : "Password reset"
        }
        form_description={
          verificationType === "email"
            ? "Enter the email you registered with to get verification code to verify your email."
            : "Enter the email you registered with to get verification code to reset your password."
        }
        verificationType={"email"}
      />
    </div>
  );
};

export default SendVerificationCodePage;
