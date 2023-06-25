"use client";
import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import Link from "next/link";
import { styles } from "../styles";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PhoneNumberInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <PhoneInput
        type="text"
        className={props.styleValue}
        defaultCountry={props.defaultCountry}
        {...field}
        {...props}
        onChange={(value) => {
          helpers.setValue(value);
        }}
      />
      {meta.error && meta.touched ? (
        <div className="text-red-600">{meta.error}</div>
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
          console.log("submitting..", values);
          const response = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
              ...values,
            }),
          });

          const data = await response.json();
          console.log(data);
        }}
        validationSchema={Yup.object({
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
            <div className="flex flex-col  gap-2 w-full">
              <label htmlFor="firstName">First name</label>
              <Field
                name="firstName"
                type="text"
                className={styles.input}
                placeholder="First name"
              />
            </div>

            <div className="flex flex-col  gap-2 w-full">
              <label htmlFor="otherName">Other name</label>
              <Field
                name="otherName"
                type="text"
                className={styles.input}
                placeholder="Other name"
              />
            </div>

            <div className="flex flex-col  gap-2 w-full">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="email"
                className={styles.input}
                placeholder="email"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <PhoneNumberInput
                label="Phone number"
                defaultCountry="NG"
                name="phoneNumber"
                placeholder="Phone number"
                styleValue={styles.input}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className={styles.input}
                placeholder="password"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="passwordRepeat">Password Confirm</label>
              <Field
                name="passwordRepeat"
                type="password"
                className={styles.input}
                placeholder="Confirm password"
              />
            </div>

            <button type="submit" className={`${styles.buttonFluid}`}>
              Submit
            </button>
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
