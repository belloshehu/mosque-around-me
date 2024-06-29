"use client";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import CustomSelectField from "../..//CustomSelectField";
import { Country, State, City } from "country-state-city";
import { useOnboardingContext } from "../../../context/onboarding-context";
import OnboardingButton from "../onboarding-button";

const LocationForm = () => {
  const {
    increaseProgress,
    setLocation,
    location,
    progress,
    decreaseProgress,
  } = useOnboardingContext();
  const [countryStateCity, setCountryStateCity] = useState({
    countries: Country.getAllCountries(),
    states: [],
    cities: [],
  });

  const [selectedValues, setSelectedValues] = useState({
    country: null,
    state: null,
    city: null,
  });

  const selectHandler = (e) => {
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

  useEffect(() => {
    console.log("location form");
  }, []);

  return (
    <div className="w-full lg:p-10 rounded-md bg-white">
      <Formik
        initialValues={{
          state: location?.state || "",
          city: location.city || "",
          country: location.city || "",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const state = selectedValues.state.name;
          const country = selectedValues.country.name;

          // set new values using the state and country names respectively
          const newValues = { ...values, state, country };
          setSubmitting(true);
          setLocation({ country, state, city: values.city });
          increaseProgress();
        }}
        validationSchema={Yup.object({
          city: Yup.string().required("City required"),
          state: Yup.string().required("State required"),
          country: Yup.string().required("Country required"),
        })}>
        {({ isSubmitting, touched, values, setFieldValue }) => (
          <Form onChange={selectHandler}>
            <div className="flex flex-col items-center text-left justify-center gap-2 md:gap-5 w-full">
              <CustomSelectField name="country" label="Country">
                <option value="">Select country</option>
                {countryStateCity.countries.map(({ name, isoCode }) => (
                  <option value={isoCode} key={isoCode}>
                    {name}
                  </option>
                ))}
              </CustomSelectField>

              <CustomSelectField name="state" label="State">
                <option value="">Select state</option>
                {countryStateCity.states.map(({ name, isoCode }) => (
                  <option value={isoCode} key={isoCode}>
                    {name}
                  </option>
                ))}
              </CustomSelectField>
              <CustomSelectField name="city" label="City">
                <option value="">Select city</option>
                {countryStateCity.cities.map(({ name }) => (
                  <option value={name} key={name}>
                    {name}
                  </option>
                ))}
              </CustomSelectField>
            </div>

            <button
              className="bg-primary p-2 px-4 mt-4 w-full rounded-md text-white"
              type="submit">
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LocationForm;
