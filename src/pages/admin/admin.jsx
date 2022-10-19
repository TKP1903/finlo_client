// Component for the admin page
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MdSearch, MdAdd, MdDelete, MdEdit } from "react-icons/md";

import { API_URL } from "../../key";
import axios from "axios";

import "./admin.css";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

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

/*
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

/*
 * @params {String} country
 *
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

const fetchCities = async (state) => {
  try {
    const response = await axios.get(`${countriesAPI.url}cities/${state}`, {
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
      <h2> Registeration From: </h2>
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

// 2 dummuy clients for debug
const dummyClients = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "jhonedoe@xyz.com",
    phone: "1234567890",
    city: "Abbeville",
    state: "Alabama",
    country: "United States",
    status: "active",
    // branchOffice: "office1",
    // sales: "sales",
    // employee: "raju",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    email: "jhonedoe@xyz.com",
    phone: "1234567890",
    city: "Abbeville",
    state: "Alabama",
    country: "United States",
    status: "inactive",
    // branchOffice: "office1",
    // sales: "sales",
    // employee: "raju",
  },
  {
    id: 3,
    firstName: "John",
    lastName: "Doe",
    email: "jhonedoe@xyz.com",
    phone: "1234567890",
    city: "Abbeville",
    state: "Alabama",
    country: "United States",
    status: "active",
    // branchOffice: "office1",
    // sales: "sales",
    // employee: "raju",
  },
];

for (let i = 0; i < 10; i++) {
  dummyClients.push({
    ...dummyClients[0],
    id: dummyClients.length + 1,
  });
}

const performSearch = async (text) => {
  return dummyClients;
};

const SearchArea = () => {
  const [searchText, setSearch] = useState("");
  const [clients, setClients] = useState([]);

  const makeClientsFromResults = (results) => {
    return results.map((client) => {
      return {
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: client.phone,
        city: client.city,
        state: client.state,
        country: client.country,
        status: client.status,
      };
    });
  };

  useEffect(() => {
    const getSearchResults = async () => {
      const results = await performSearch(searchText);
      setClients(() => makeClientsFromResults(results));
    };
    getSearchResults();
    // setClients(dummyClients);
  }, [searchText]);

  const resetFilters = () => {

  };

  const ResultsTable = ({ clients, className }) => {
    const [filteredClients, setFilteredClients] = useState([...clients]);

    if (!Array.isArray(clients) || clients.length === 0) {
      return (
        <div className={className}>
          <h2> &nbsp; No Results Found &nbsp; </h2>
        </div>
      );
    };

    const Filter = ({ type, label, options, onChange }) => {
      const selectRef = useRef();
      return (
        <div className="filter">
          <label className="filter-label" htmlFor={type}>
            {label}
          </label>
          <div className="filter-input">
            <select ref={selectRef} name={type} id={type} onChange={onChange}>
              <option value="">All</option>
              {options.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    };
  
    /*
    *   FirstName : String
    *   LastName : String
    *   Email : Email
    *   Phone : String
    *   City : String
    *   State : String
    *   Country : String
    *   Status : Active/Inactive
    * 
  //  *   Sales : String
  //  *   Employee : String
    */

    const makeFilterOptions = (clients, type) => {
      const filters = new Set();
      clients.forEach((client) => {
        filters.add(client[type]);
      });
      return Array.from(filters);
    };

    const filterOnChange = (setFilteredClients, clients, type) => {
      return (e) => {
        const value = e.target.value;
        if (value === "" || value === "All") {
          setFilteredClients([...clients]);
        } else {
          const filteredClients = clients.filter((client) => {
            return client[type] === value;
          });
          setFilteredClients(filteredClients);
        }
      };
    };

    const clientsList = filteredClients.map((client) => {
      return (
        <tr
          key={`client-${client.id}`}
          className={
            client.status == "active" ? "client-active" : "client-inactive"
          }
        >
          <td className="client-firstName"> {client.firstName} </td>
          <td className="client-lastName"> {client.lastName} </td>
          <td className="client-email"> {client.email} </td>
          <td className="client-phone"> {client.phone} </td>
          <td className="client-city"> {client.city} </td>
          <td className="client-state"> {client.state} </td>
          <td className="client-country"> {client.country} </td>
          <td className="client-active-status">
            {" "}
            {client.status == "active" ? "Active" : "Inactive"}{" "}
          </td>
          {/* <td> {client.branchOffice} </td> */}
          {/* <td> {client.sales} </td>
          <td> {client.employee} </td> */}
        </tr>
      );
    });
    
    return (
      <table className={className}>
        <thead>
          <tr>
            <th>
              <Filter
                type="filter-firstName"
                label="First Name"
                options={makeFilterOptions(filteredClients, "firstName")}
                onChange={(e) => {}}
              />
            </th>
            <th>
              <Filter
                type="filter-lastName"
                label="Last Name"
                options={makeFilterOptions(filteredClients, "lastName")}
                onChange={filterOnChange(
                  setFilteredClients,
                  filteredClients,
                  "lastName"
                )}
              />
            </th>
            <th>
              <Filter
                type="filter-email"
                label="Email"
                options={makeFilterOptions(filteredClients, "email")}
                onChange={() => {}}
              />
            </th>
            <th>
              <Filter
                type="filter-phone"
                label="Phone"
                options={makeFilterOptions(filteredClients, "phone")}
                onChange={() => {}}
              />
            </th>
            <th>
              <Filter
                type="filter-city"
                label="City"
                options={makeFilterOptions(filteredClients, "city")}
                onChange={() => {}}
              />
            </th>
            <th>
              <Filter
                type="filter-state"
                label="State"
                options={makeFilterOptions(filteredClients, "state")}
                onChange={() => {}}
              />
            </th>
            <th>
              <Filter
                type="filter-country"
                label="Country"
                options={makeFilterOptions(filteredClients, "country")}
                onChange={() => {}}
              />
            </th>
            <th>
              <Filter
                type="filter-status"
                label="Status"
                options={makeFilterOptions(filteredClients, "status")}
                onChange={filterOnChange(
                  setFilteredClients,
                  filteredClients,
                  "status"
                )}
              />
            </th>
            {/* <th> Sales </th>
            <th> Branch Office </th>
            <th> Employee </th> */}
          </tr>
        </thead>
        <tbody>{clientsList}</tbody>
      </table>
    );
  };

  const SearchBox = ({ className }) => {

    const inputRef = useRef(null);
    const searchIconRef = useRef(null);

    const clickSearchIcon = () => {
      console.log(searchIconRef);
      console.log(inputRef);
      // click it
      inputRef.current.click();
    };

    return (
      <div className={className}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Search"
          onKeyDown={(e) => {
            console.log("searching");
            return e.key === "Enter" ? clickSearchIcon() : null;
          }}
        />
        {/* make wrapper for search icon */}
        <div
          className="searchIcon"
          ref={searchIconRef}
          onClick={() => {
            console.log(inputRef.current.value);
            setSearch(inputRef.current.value);
          }}
        >
          <MdSearch />
        </div>
      </div>
    );
  };

  const TableOptions = () => {
    return (
      <div className="table-options">
        <SearchBox className="search-box" />
        <div className="table-options-buttons">
          <button className="reset-filters"> Reset Filters </button>
          <button className="table-options-button add-btn">
            <MdAdd /> Add
          </button>
          <button className="table-options-button delete-btn">
            <MdDelete /> Delete
          </button>
          <button className="table-options-button edit-btn">
            <MdEdit /> Edit
          </button>
        </div>
      </div>

    );
  };
  return (
    <div className="search-area">
      <h1> Clients </h1>
      
      <TableOptions />
      
      <ResultsTable className="searchResults" clients={clients} />
    </div>
  );
};

const Admin = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1> Register a client </h1>
      </div>
      <div className="admin-page-body">
        <RegisterForm />
        <hr></hr>
        <SearchArea />
      </div>
      <hr />
      {/* <SearchArea /> */}
      <div className="admin-page-footer">&copy; Finlo Inc, 2022</div>
    </div>
  );
};

export default Admin;
