import { Country } from "country-state-city";
import { useState } from "react";

export const useSelecCountryStateCitytHandler = (event) => {
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
};

export const SelectHandler = (e) => {
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
