"use client";
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import Link from "next/link";
import { styles } from "../styles";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import googleIcon from "../_images/google.png";
import { CustomInputField } from "./CustomInputField";
import { signIn } from "next-auth/react";

const PhoneNumberInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <PhoneInput
        type="text"
        className={`flex gap-4 ${props.styleValue}`}
        defaultCountry={props.defaultCountry}
        {...field}
        {...props}
        onChange={(value) => {
          helpers.setValue(value);
        }}
      />
      {meta.error && meta.touched ? (
        <div>
          <small className="text-red-500">{meta.error}</small>
        </div>
      ) : null}
    </div>
  );
};

const SignupForm = () => {
  return (
    <div className="w-full lg:w-1/3 bg-gradient-to-tr">
      <Formik
        initialValues={{
          email: "",
          phoneNumber: "",
          firstName: "",
          otherName: "",
          //   terms: "",
          phoneNumber: "",
          password: "",
          passwordRepeat: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          axios
            .post("/api/signup", values)
            .then(() => toast.success("Signed up successfully"))
            .catch((error) => {
              toast.error(error.response.data || "Something went wrong");
            });
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .min(2, "Must be atlest 2 characters")
            .required("First name is required"),
          otherName: Yup.string()
            .min(2, "Must be atlest 2 characters")
            .required("Other name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          phoneNumber: Yup.string().required("Phone number is required"),
          password: Yup.string()
            .min(8, "Must be at least 8 characters")
            .required("Password required")
            .matches(/[a-z]+/, "Must contain atleast one lowercase character")
            // .matches(/[A-Z]+/, "One uppercase character")
            // .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "Must contain atleast one number"),
          passwordRepeat: Yup.string()
            .required("Confirm password required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
          //   terms: Yup.string().required("You must accept the terms to proceed"),
        })}>
        <Form>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
            <div className="flex flex-col lg:flex-row gap-0 lg:gap-2 w-full">
              <CustomInputField
                name="firstName"
                label="First name"
                placeholder="First name"
                type="text"
              />
              <CustomInputField
                name="otherName"
                label="Other name"
                placeholder="Other name"
                type="text"
              />
            </div>

            <CustomInputField
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
            />

            <div className="flex flex-col gap-2 w-full">
              <PhoneNumberInput
                label="Phone number"
                defaultCountry="NG"
                name="phoneNumber"
                placeholder="Phone number"
                styleValue={styles.input}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-0 lg:gap-2 w-full">
              <CustomInputField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <CustomInputField
                name="passwordRepeat"
                label="Password repeat"
                placeholder="Password repeat"
                type="password"
              />
            </div>

            <button type="submit" className={`${styles.buttonFluid}`}>
              Submit
            </button>

            <div className="flex flex-col lg:flex-row p-0 w-full text-black">
              <button
                onClick={() => signIn("google")}
                className={`${styles.buttonFluidPlain} flex gap-2 items-center justify-center text-black bg-purple-900 shadow-lg w-full`}>
                <Image
                  src={googleIcon}
                  width={10}
                  height={10}
                  className="w-[30px]"
                  alt="google-icon"
                />
                Sign in with Google
              </button>
            </div>

            <div className="flex justify-center items-center gap-1">
              <p>Have an account? </p>
              <Link href="/auth/login" className="underline">
                Login
              </Link>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignupForm;
