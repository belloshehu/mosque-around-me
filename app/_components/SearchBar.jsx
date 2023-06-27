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
import { Country, State, City } from "country-state-city";

const SearchBar = () => {
  const [countryStateCity, setCountryStateCity] = useState({
    countries: Country.getAllCountries(),
    states: [],
    cities: [],
  });

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({
    country: null,
    state: null,
    city: null,
  });

  const SelectHandler = (e) => {
    const fieldName = e.target.name;
    if (fieldName === "country") {
      const countryCode = e.target.value;

      // get selected country (full properties)
      const selectedCountry = Country.getCountryByCode(countryCode);

      //update country property of the selected values
      setSelectedValues((prev) => ({
        ...prev,
        country: selectedCountry,
      }));
      const statesInSelectedCountry = State.getStatesOfCountry(countryCode);

      // update state select element with states of the selected country
      setCountryStateCity((prev) => ({
        ...prev,
        states: statesInSelectedCountry,
      }));
    } else if (fieldName === "state") {
      const stateCode = e.target.value;

      // get selected state
      const selectedState = State.getStateByCodeAndCountry(
        stateCode,
        selectedValues.country.isoCode
      );

      // set selected state in the selectedValues
      setSelectedValues((prev) => ({
        ...prev,
        state: selectedState,
      }));

      // get cities in the selected state
      const citiesInSelectedState = City.getCitiesOfState(
        selectedValues.country.isoCode,
        stateCode
      );

      // update cities property with cities of the selected country
      setCountryStateCity((prev) => ({
        ...prev,
        cities: citiesInSelectedState,
      }));
    } else if (fieldName === "city") {
      const cityName = e.target.value;

      // get selected city
      const selectedCity = countryStateCity.cities.filter(
        (city) => city.name === cityName
      );

      // set selected city in the selectedValues
      setSelectedValues((prev) => ({
        ...prev,
        city: selectedCity[0],
      }));
    }
  };
  return (
    <div className="w-full bg-gradient-to-tr md:bg-slate-100 md:bg-opacity-75 md:shadow-lg md:max-h-40 md:py-5">
      <Formik
        initialValues={{
          activity: "",
          city: "",
          state: "",
          country: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // create a title/heading for search result such as "Eid in kano, kano, Nigeria"
          setIsLoading(true);
          const city = selectedValues.city.name;
          const state = selectedValues.state.name;
          const country = selectedValues.country.name;

          // set new values using the state and country names respectively
          const newValues = { ...values, state, country };

          const resultTitle = `${values.activity} in ${city}, ${state}, ${country}`;
          dispatch(setSearchResultTitle(resultTitle));

          // converts {a: 10, b: 2, c: 'hell'} to a=10&b=2&c=hello
          const url = new URLSearchParams(newValues);
          const queryParams = url.toString();

          const response = await fetch(
            `http://localhost:3000/api/mosques/search?${queryParams}`,
            {
              next: {
                revalidate: 60 * 60,
              },
            }
          );
          const mosques = await response.json();
          dispatch(setMosques(mosques));
          setIsLoading(false);
        }}
        validationSchema={Yup.object({
          activity: Yup.string().required(),
          city: Yup.string().required(),
          state: Yup.string().required(),
          country: Yup.string().required(),
        })}>
        <Form onChange={SelectHandler}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5 w-full  lg:w-4/5 mx-auto">
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
              <Field name="city" as="select" className={styles.input}>
                <option value={""}>Select city</option>
                {countryStateCity?.cities?.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Field>
            </div>

            <div className="flex gap-2 w-full">
              <Field name="state" as="select" className={styles.input}>
                <option value={""}>Select state</option>
                {countryStateCity?.states?.map(({ name, isoCode }) => (
                  <option key={isoCode} value={isoCode}>
                    {name}
                  </option>
                ))}
              </Field>
              <Field
                name="country"
                as="select"
                className={styles.input}
                placeholder="country">
                {countryStateCity.countries.map(({ name, isoCode }) => (
                  <option key={isoCode} value={isoCode}>
                    {name}
                  </option>
                ))}
              </Field>
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
