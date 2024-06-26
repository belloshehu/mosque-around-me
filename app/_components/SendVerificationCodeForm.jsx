"use client";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SendVerificationCodeForm = ({
  form_description,
  form_heading,
  verificationType,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/auth/sendVerificationCode", {
        email: value,
        verificationType,
      });
      toast.success(data.message);
      if (verificationType === "email") {
        router.push(`/auth/verifyEmail/${data.verificationCodeExpiry}`);
      } else {
        router.push(`/auth/passwordreset/${data.verificationCodeExpiry}`);
      }
    } catch (error) {
      toast.error(error?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-2/5 shadow-xl md:p-10">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col items-center h-full w-full">
        <div className="mt-5 text-center w-full">
          <p>{form_description}</p>
        </div>

        <section className="verification-form-body">
          <div className="w-full my-3">
            <input
              type="email"
              name="email"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter your email"
              className="p-2 w-full outline-none border-primary border-b-2 bg-purple-50 shadow-inner cursor-auto"
            />
          </div>

          <div className="flex flex-col justify-center items-center w-full my-5 gap-5">
            <SubmitButton isLoading={isLoading} />
            <Link
              href="/auth/login"
              className="underline text-blue-600 w-full text-left">
              Login
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
};

export default SendVerificationCodeForm;
