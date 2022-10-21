// import react
import React from "react";

import { API_URL } from "../../../key";
import axios from "axios";

import { dummyClients } from "../dummy_data";

// ? change this api ?
const countriesAPI = "https://restcountries.com/v2/all?fields=name";
// const countriesAPI = "https://www.universal-tutorial.com/api/";
// const countriesAPI = {
//   url: "https://www.universal-tutorial.com/api/",
//   token: " _ZC6EUQG-gVv6aNU3l7-Zp_gkcpsS38qY0WygNM9b6MPD20IDGkoRuJGNxJaM_z1WtA",
//   userEmail: "aashishsingla567@gmail.com",
//   authToken: "",
//   // authToken: (async ()=> {
//   //   const response = await axios.post(`${countriesAPI.url}getaccesstoken`, {
//   //     "email": countriesAPI.userEmail,
//   //     "api_token": countriesAPI.token
//   //   });
//   //   return response.data.auth_token;
//   // })(),
// };

/**
 * Fetches the Auth tokens needed for the API calls
 * @param {} no params
 * @return {JSX} RegisterForm
 */
const fetchAuthTokens = async () => {
  // const response = await axios.post(`${countriesAPI.url}getaccesstoken`, {
  //   email: countriesAPI.userEmail,
  //   api_token: countriesAPI.token,
  // });
  // return response.data.auth_token;
};
/** 
 * Fetches the list of countries
 * @param no params
 * @return Promise<Array>
 *  [
 *    {
 *      "country_name": "India",
 *      "country_short_name": "IN",
 *      "country_phone_code": "91",
 *    },
 *    ...
 *  ]
 */
const fetchCountries = async () => {
  try {
    const response = await axios.get(`${countriesAPI.url}countries/`, {
      headers: {
        Authorization: `Bearer ${await countriesAPI.authToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * Fetches the list of states for a country
 * @params {String} country
 * @return {Promise<Array>} states
 */
const fetchStates = async (country) => {
  try {
    const response = await axios.get(`${countriesAPI.url}states/${country}`, {
      headers: {
        Authorization: `Bearer ${await countriesAPI.authToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
* Fetches a list of cities for a state 
* @param {String} state
* @return {Promise<Array>} cities
*/
const fetchCities = async (state) => {
  try {
    const {cities} = await axios.get(`${countriesAPI.url}cities/${state}`, {
      headers: {
        Authorization: `Bearer ${await countriesAPI.authToken}`,
      },
    });
    return cities;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const performSearch = async (text) => {
    return dummyClients;
};
  
export {
    fetchAuthTokens,
    fetchCountries,
    fetchStates,
    fetchCities,
    performSearch,
};
