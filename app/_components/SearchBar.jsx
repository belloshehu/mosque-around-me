"use client";
import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { styles } from "../styles";

const SearchBar = () => {
  return (
    <div>
      <Formik
        initialValues={{
          service: "",
          town: "",
          state: "",
          country: "",
        }}
        onSubmit={(values, { setSubmitting, e }) => {
          e.preventDefault();
          console.log("submitting..", values);
        }}
        validationSchema={Yup.object({
          service: Yup.string().required(),
          town: Yup.string().required(),
          state: Yup.string().required(),
          country: Yup.string().required(),
        })}>
        <Form>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5">
            <div className="flex gap-2">
              <Field
                name="activity"
                as="select"
                className={styles.input}
                placeholder="activity: e.g, prayer">
                <option value="Eid prayer" selected>
                  Eid prayer
                </option>
                <option value="Juma'ah prayer">Juma'ah prayer</option>
                <option value="Lecturer">Lecture</option>
              </Field>
              <Field
                name="town"
                type="text"
                className={styles.input}
                placeholder="town"
              />
            </div>

            <div className="flex gap-2">
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
            <Link href="#" className={styles.button}>
              Search
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
