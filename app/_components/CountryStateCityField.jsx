"use cient";
/* 
    Custom component for selecting city, state and country. 

    The field are cascaded in the sense when a country is selected,
    its states are automatically selected and when a state is select,
    cities of the that state are selected automatically.

    It uses the country-state-city package/library to get the country, state and city data.



 */
import CustomSelectField from "./CustomSelectField";
import { Country, State, City } from "country-state-city";

const CountryStateCityField = ({
  countryDefault,
  stateDefault,
  cityDefault,
  setCountryStateCityNames,
  countryStateCityNames,
}) => {
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
    <>
      <CustomSelectField
        name="country"
        label="Country"
        onChange={SelectHandler}>
        <option value="">{countryDefault}</option>
        {countryStateCity.countries.map(({ name, isoCode }) => (
          <option value={isoCode} key={isoCode}>
            {name}
          </option>
        ))}
      </CustomSelectField>
      <CustomSelectField name="state" label="State" onChange={SelectHandler}>
        <option value="">{stateDefault}</option>
        {countryStateCity.states.map(({ name, isoCode }) => (
          <option value={isoCode} key={isoCode}>
            {name}
          </option>
        ))}
      </CustomSelectField>
      <CustomSelectField name="city" label="City" onChange={SelectHandler}>
        <option value="">{cityDefault}</option>
        {countryStateCity.cties.map(({ name }) => (
          <option value={name} key={name}>
            {name}
          </option>
        ))}
      </CustomSelectField>
    </>
  );
};

export default CountryStateCityField;
