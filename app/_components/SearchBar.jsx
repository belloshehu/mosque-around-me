"use client";
import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { styles } from "../styles";

const SearchBar = () => {
  return (
    <div className="w-full bg-gradient-to-tr">
      <Formik
        initialValues={{
          activity: "",
          town: "",
          state: "",
          country: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("submitting..", values);
          const response = await fetch("http://localhost:3000/api/mosques");
          const mosques = await response.json();
          console.log("mosques: ", mosques);
        }}
        validationSchema={Yup.object({
          activity: Yup.string().required(),
          town: Yup.string().required(),
          state: Yup.string().required(),
          country: Yup.string().required(),
        })}>
        <Form>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5 w-full">
            <div className="flex gap-2  w-full">
              <Field
                name="activity"
                as="select"
                className={styles.input}
                placeholder="activity: e.g, prayer">
                <option value="eid">Select activiy</option>
                <option value="eid">Eid prayer</option>
                <option value="juma">Juma'ah prayer</option>
                <option value="program">Lecture</option>
              </Field>
              <Field
                name="town"
                type="text"
                className={styles.input}
                placeholder="town"
              />
            </div>

            <div className="flex gap-2 w-full">
              <Field
                name="state"
                type="text"
                className={styles.input}
                placeholder="state"
              />
              <Field
                name="country"
                type="text"
                className={styles.input}
                placeholder="country"
              />
            </div>
            <button type="submit" className={styles.button}>
              Search
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
