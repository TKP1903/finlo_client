// import react
import React, { useState, useEffect, useRef } from "react";

import { 
  fetchAuthTokens,
  fetchCountries,
  fetchStates,
  fetchCities,
  performSearch,
} from "../api_callers";

const RegisterForm = () => {
  // TODO :: make a ref to the form element
  const formRef = useRef();
  const [selectedOptions, setSelectedOptions] = useState({
    country: "",
    state: "",
    city: "",
  });
  // TODO :: Implement the following methods
  const submitForm = () => {};

  const resetForm = () => {};

  const CountriesSelection = () => {
    const [countries, setCountries] = useState([]);
    const countriesRef = useRef(null);

    useEffect(() => {
      const getCountries = async () => {
        try {
          if (
            !Array.isArray(countriesRef.current) ||
            countriesRef.current.length === 0
          ) {
            const { data } = await fetchCountries();
            console.log(data);
            countriesRef.current = data;
          }
          setCountries(countriesRef.current);
        } catch (err) {
          console.log({ err });
        }
      };
      getCountries();
    }, []);

    const countriesList = countries.map((country) => {
      return (
        <option value={country.name} key={country.name}>
          {country.name}
        </option>
      );
    });

    return (
      <select name="country">
        <option value="">Select a country</option>
        {countriesList}
      </select>
    );
  };
  const StatesSelection = () => {};
  const CitySelection = () => {};

  return (
    <div className="RegisterForm">
      {/* form to register a client */}
      {/* <h2> Registeration From: </h2> */}
      <form className="admin-page-form">
        {/* seperate columns for labels and inputs */}
        <div className="form-column">
          {/*
           * First Name : String
           * Email : Email
           * Country : Selection
           * City : Selection
           * Branch Office : String
           * Source : String
           */}
          <div className="form-labels">
            <label htmlFor="first-name" required>
              {" "}
              First Name:{" "}
            </label>
            <label htmlFor="email" required>
              {" "}
              Email:{" "}
            </label>
            <label htmlFor="country"> Country: </label>
            <label htmlFor="city"> City: </label>
            <label htmlFor="branch-office"> Branch Office: </label>
            <label htmlFor="source"> Source: </label>
          </div>
          <div className="form-inputs">
            <input type="text" name="first-name" id="first-name" />
            <input type="email" name="email" id="email" />
            <input type="text" name="country" id="country" />
            {/* <CountriesSelection /> */}
            <input type="text" name="city" id="city" />
            <input type="text" name="branch-office" id="branch-office" />
            <input type="text" name="source" id="source" />
          </div>
        </div>
        <div className="form-column">
          {/*
           * Last Name : String
           * Phone Number : Number
           * State  : Selection
           * Sales  : String
           * Employee : String
           * Status : Active/Inactive
           */}
          <div className="form-labels">
            <label htmlFor="last-name"> Last Name: </label>
            <label htmlFor="phone-number"> Phone Number: </label>
            <label htmlFor="state"> State: </label>
            {/* <label htmlFor="sales"> Sales: </label> */}
            <label htmlFor="employee"> Employee: </label>
            <label htmlFor="status"> Status: </label>
          </div>
          <div className="form-inputs">
            <input type="text" name="last-name" id="last-name" />
            <input type="number" name="phone-number" id="phone-number" />
            <input type="text" name="state" id="state" />
            {/* <input type="text" name="sales" id="sales" /> */}
            <input type="text" name="employee" id="employee" />
            {/* select status */}
            {/* default select active */}

            <select name="status" id="status">
              <option value="active"> Active </option>
              <option value="inactive"> Inactive </option>
            </select>
          </div>
        </div>
        {/* submit and cancel buttons */}
      </form>
      <div className="form-buttons">
        <button type="submit" onClick={submitForm}>
          {" "}
          Submit{" "}
        </button>
        <button type="reset" onClick={resetForm}>
          {" "}
          Cancel{" "}
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
