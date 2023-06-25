"use client";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { styles } from "../styles";
import Link from "next/link";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  return (
    <div className="w-full lg:w-1/3 bg-gradient-to-tr">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          signIn("credentials", {
            ...values,
            redirect: false,
          })
            .then((callback) => {
              if (callback.error) {
                toast.error(callback.error);
              }
              if (!callback.error && callback.ok) {
                toast.success("Logged in successfully");
              }
            })
            .catch((error) => {
              console.log(error);
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

            <button type="submit" className={`${styles.buttonFluid}`}>
              Submit
            </button>
            <div className="flex justify-center items-center gap-1">
              <p>Have not account? </p>
              <Link href="/auth/signup" className="underline">
                Signup
              </Link>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
