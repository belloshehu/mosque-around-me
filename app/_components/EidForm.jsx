"use client";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { styles } from "../styles";
import CustomInputField from "./CustomInputField";
import { FaSpinner } from "react-icons/fa";
import CustomSelectField from "./CustomSelectField";
import { Country, State, City } from "country-state-city";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { updateFormSuccess } from "../GlobalRedux/features/form/formSlice";
import { useDispatch } from "react-redux";

const EidForm = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
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

  return (
    <div className="w-full lg:w-1/3 bg-gradient-to-tr lg:border-2 lg:p-10 rounded-md">
      <Formik
        initialValues={{
          address: "",
          state: "",
          city: "",
          country: "",
          mosqueName: "",
          date: "",
          time: "",
          imamName: "",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const state = selectedValues.state.name;
          const country = selectedValues.country.name;

          // set new values using the state and country names respectively
          const newValues = { ...values, state, country, user: session.user };
          console.log("submitting..", newValues);
          setSubmitting(true);
          axios
            .post("/api/eid", newValues)
            .then(() => {
              toast.success("Eid added successfully");
              resetForm();
              // set form success to show success message
              dispatch(updateFormSuccess(true));
            })
            .catch((error) => {
              toast.error(error.response.data || "Something went wrong");
            });
          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          address: Yup.string().required("Address required"),
          city: Yup.string().required("City required"),
          state: Yup.string().required("State required"),
          country: Yup.string().required("Country required"),
          mosqueName: Yup.string().required("Mosque name required"),
          date: Yup.string().required("Date required"),
          time: Yup.string().required("Time required"),
          imamName: Yup.string(),
        })}>
        {({ isSubmitting }) => (
          <Form onChange={selectHandler}>
            <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
              <CustomInputField
                name="mosqueName"
                label="Mosque name"
                placeholder="Name of Eid ground/mosque"
                type="text"
              />
              <CustomInputField
                name="imamName"
                label="Imam Name"
                placeholder="Eid imam name"
                type="text"
              />
              <CustomInputField
                name="address"
                label="Address"
                placeholder="Your/mosque address"
                type="text"
              />
              <CustomInputField
                name="Time"
                label="Time"
                placeholder="Eid prayer time"
                type="time"
              />
              <CustomInputField
                name="date"
                label="Date"
                placeholder="Eid prayer date"
                type="date"
              />
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

              <button
                type="submit"
                className={`${styles.buttonFluid} flex gap-2 items-center justify-center`}
                disabled={isSubmitting}>
                Submit
                {isSubmitting && (
                  <FaSpinner
                    className={`${isSubmitting ? "animate-spin" : ""}`}
                  />
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EidForm;
