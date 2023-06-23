"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { styles } from "../styles";
import { useDispatch } from "react-redux";
import {
  setMosques,
  setSearchResultTitle,
} from "../GlobalRedux/features/mosque/mosqueSlice";
import { FaSpinner } from "react-icons/fa";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
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
          // create a title/heading for search result such as "Eid in kano, kano, Nigeria"
          setIsLoading(true);
          const { activity, town, state, country } = values;
          const resultTitle = `${activity} in ${town}, ${state}, ${country}`;
          dispatch(setSearchResultTitle(resultTitle));

          // converts {a: 10, b: 2, c: 'hell'} to a=10&b=2&c=hello
          const url = new URLSearchParams(values);
          const queryParams = url.toString();

          const response = await fetch(
            `http://localhost:3000/api/mosques/search?${queryParams}`,
            {
              next: {
                revalidate: 60,
              },
            }
          );
          const mosques = await response.json();
          dispatch(setMosques(mosques));
          setIsLoading(false);
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
                <option value="">Select activiy</option>
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
            <button
              type="submit"
              className={`${styles.button} flex gap-2 items-center justify-center`}
              disabled={isLoading}>
              Search
              {isLoading && (
                <FaSpinner className={`${isLoading ? "animate-spin" : ""}`} />
              )}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
