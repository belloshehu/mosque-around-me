"use client";
import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { styles } from "../styles";

const MosqueAdminForm = () => {
  return (
    <div className="w-full lg:w-1/3 bg-gradient-to-tr">
      <Formik
        initialValues={{
          email: "",
          phoneNumber: "",
          fullname: "",
          state: "",
          city: "",
          country: "",
          mosqueName: "",
          positionInMosque: "",
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
          passwordRepeat: Yup.string()
            .required("Confirm password required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
          terms: Yup.string().required("You must accept the terms to proceed"),
        })}>
        <Form>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
            <div className="flex flex-col  gap-2 w-full">
              <label htmlFor="fullName">Full name</label>
              <Field
                name="fullName"
                type="text"
                className={styles.input}
                placeholder="Full name"
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
              <label htmlFor="phoneNumber">Phone number</label>
              <Field
                name="phoneNumber"
                type="tel"
                className={styles.input}
                placeholder="Phone number"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="passwordRepeat">City</label>
              <Field
                name="city"
                type="text"
                className={styles.input}
                placeholder="Confirm password"
              />
            </div>
            <div className="flex flex-row items-center  gap-2 w-full">
              <div className="flex flex-col  gap-2 w-full">
                <label htmlFor="state">State</label>
                <Field
                  name="state"
                  type="text"
                  className={styles.input}
                  placeholder="State"
                />
              </div>
              <div className="flex flex-col  gap-2 w-full">
                <label htmlFor="country">Country</label>
                <Field
                  name="otherName"
                  type="text"
                  className={styles.input}
                  placeholder="Country"
                />
              </div>
            </div>
            <div className="flex flex-col  gap-2 w-full">
              <label htmlFor="country">Mosque name</label>
              <Field
                name="mosqueName"
                type="text"
                className={styles.input}
                placeholder="Mosque name"
              />
            </div>

            <div className="flex flex-col  gap-2 w-full">
              <label htmlFor="positionInMosque">Admin type</label>
              <Field
                name="positionInMosque"
                as="select"
                className={styles.input}>
                <option value="imam">Imam</option>
                <option value="muaddhin">Muaddhin</option>
                <option value="follower">Follower</option>
              </Field>
            </div>
            <Link href="#" className={`${styles.button} w-full`}>
              Submit
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MosqueAdminForm;
