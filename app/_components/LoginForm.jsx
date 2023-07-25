"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Link from "next/link";
import { toast } from "react-hot-toast";
import googleIcon from "../_images/google.png";
import CustomInputField from "./CustomInputField";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import { signIn } from "next-auth/react";
import { useState } from "react";
import SocialLoginButton from "./SocialLoginButton";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="w-full lg:w-1/3 bg-gradient-to-tr">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setIsLoading(true);
          signIn("credentials", {
            ...values,
            redirect: false,
          })
            .then((callback) => {
              if (callback.error) {
                toast.error(callback.error);
                if (callback.error.toLowerCase() === "email not verified") {
                  router.push("/auth/verificationCode/email");
                }
              }
              if (!callback.error && callback.ok) {
                toast.success("Logged in successfully");
                router.push("/");
              }
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Must be at least 8 characters")
            .required("Password required")
            .matches(/[a-z]+/, "Must contain atleast one lowercase character")
            // .matches(/[A-Z]+/, "One uppercase character")
            // .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "Must contain atleast one number"),
        })}>
        <Form>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
            <CustomInputField
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
            />

            <CustomInputField
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />

            <div className="flex flex-col gap-1 justify-center items-center w-full my-4">
              <div className="flex justify-between items-center text-blue-500 underline w-full">
                <Link href={"/auth/verificationCode/email"}>Verify email</Link>
                <Link href={"/auth/verificationCode/password"}>
                  forgot password
                </Link>
              </div>
              <SubmitButton isLoading={isLoading} />
            </div>
          </div>
        </Form>
      </Formik>
      <SocialLoginButton
        text={"Continue with Google"}
        provider={"google"}
        socialIcon={googleIcon}
      />
      <div className="flex justify-center items-center gap-1">
        <p>Have no account? </p>
        <Link href="/auth/signup" className="underline">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
