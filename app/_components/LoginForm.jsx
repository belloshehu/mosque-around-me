"use client";
import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { styles } from "../styles";

const LoginForm = () => {
  return (
    <div className="w-full lg:w-1/3 bg-gradient-to-tr">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting, e }) => {
          e.preventDefault();
          console.log("submitting..", values);
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
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className={styles.input}
                placeholder="password"
              />
            </div>

            <Link href="#" className={`${styles.button} w-full`}>
              Login
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
