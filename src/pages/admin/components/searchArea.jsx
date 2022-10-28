// import react
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdSearch, MdAdd, MdDelete, MdEdit } from "react-icons/md";

import { search } from "../../../jsFunctions/search";

import debounce from "../../../jsFunctions/debounce";

import axios from "axios";

const makeClientDocsUrl = (client) => {
  const search = new URLSearchParams();

  search.append("user_id", client.id);
  // store the current client data in local storage
  localStorage.setItem("client", JSON.stringify(client));
  // navigate to the documents page
  const url = "/documents?" + search;
  return url;
};

const makeClientsFromRes = (data) => {
  /**
   * {
   * "user_id": 6,
   *  "user_name": "neel",
   *  "email": "neel@gmail.com",
   *  "password": "$2a$10$CBPGh2/P8.Uk/lvCbKGHj.ViVdRozMGZkOAWyZoDx92VssKzWf2jW",
   *  "customer_profile_id": null,
   *  "customer_documents_id": null,
   *  "user_role_id": null,
   *  "phone": null,
   *  "city": null,
   *  "state": null,
   *  "pincode": null,
   *  "country": null,
   *  "profile_url": null,
   *  "created_date_time": null,
   *  "updated_date_time": null,
   *  "user_role": "client"
   * }
   * {
   *  "id": user_id,
   *  "firstName": First_name,
   *  "lastName": Last_name,
   *  "email": email,
   *  "phone": phone,
   *  "state": state,
   *  "city": city,
   *  "country": country,
   *  staus: user_role === "client" ? "active" : "inactive"
   * }
   *
   * }
   */

  const clients = data.map((client) => {
    return {
      id: client.user_id,
      firstName: client.first_name,
      lastName: client.last_name,
      email: client.email,
      phone: client.phone,
      state: client.state,
      city: client.city,
      // country: client.country,
      status: client.user_role === "client" ? "active" : "inactive",
    };
  });
  return clients;
};

const performSearch = search;

const SearchBox = ({ className, handleSearch }) => {
  const inputRef = useRef(null);
  const searchIconRef = useRef(null);

  const clickSearchIcon = () => {
    console.log(searchIconRef);
    console.log(inputRef);
    // click it
    searchIconRef.current.click();
  };

  return (
    <div className={className}>
      <input
        type="text"
        ref={inputRef}
        key="search-input"
        placeholder="Search"
        // defaultValue={searchText}
        onKeyDown={(e) => {
          console.log("searching");
          return e.key === "Enter" ? clickSearchIcon() : null;
        }}
        onChange={debounce((e) => {
          handleSearch(e.target.value);
        })}
      />
      {/* make wrapper for search icon */}
      <div
        className="searchIcon"
        ref={searchIconRef}
        onClick={() => {
          handleSearch(inputRef.current.value);
        }}
      >
        <MdSearch />
      </div>
    </div>
  );
};

const ResultsTable = ({ clients, className, handleFilter }) => {
  const navigate = useNavigate();
  if (!Array.isArray(clients) || clients.length === 0) {
    return (
      <div className={className}>
        <h2> &nbsp; No Results Found &nbsp; </h2>
      </div>
    );
  }

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
  // ! *  Sales : String
  // ! *  Employee : String
  */

  const Filter = ({ type, label, options, onChange }) => {
    const selectRef = useRef();
    return (
      <div className="filter">
        <label className="filter-label" htmlFor={type}>
          {label}
        </label>
        {/* <div className="filter-input">
        <select ref={selectRef} name={type} id={type} onChange={onChange}>
          <option value="">All</option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div> */}
      </div>
    );
  };

  const resetFilters = () => {
    // setFilteredClients(() => clients);
    // set select elements to default option (all)
    // TODO :: reset the HTMLSelectElement(s)
  };

  const makeFilterOptions = (clients, type) => {
    const filters = new Set();
    clients.forEach((client) => {
      filters.add(client[type]);
    });
    return Array.from(filters);
  };

  const clientsList = clients.map((client) => {
    return (
      <tr
        key={`client-${client.id}`}
        className={
          client.status == "active" ? "client-active" : "client-inactive"
        }
      >
        <td
          className="client-firstName"
          onClick={() => {
            navigate(makeClientDocsUrl(client));
          }}
        >
          {" "}
          {client.firstName}{" "}
        </td>

        <td className="client-lastName"> {client.lastName} </td>
        <td className="client-email"> {client.email} </td>
        <td className="client-phone"> {client.phone} </td>
        <td className="client-city"> {client.city} </td>
        <td className="client-state"> {client.state} </td>
        {/* <td className="client-country"> {client.country} </td> */}
        <td className="client-active-status">
          {" "}
          {client.status == "active" ? "Active" : "Inactive"}{" "}
        </td>
        <td className="action-btn">
          <div className="action-btn-in">
            <button className="table-options-button button-contained ">
              <MdEdit style={{ width: "20px" }} />
            </button>
          </div>
          <div className="action-btn-in">
            <button className="table-options-button delete-btn">
              <MdDelete style={{ width: "25px" }} />
            </button>
          </div>
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
              options={makeFilterOptions(clients, "firstName")}
              onChange={(e) => {}}
            />
          </th>
          <th>
            <Filter
              type="filter-lastName"
              label="Last Name"
              options={makeFilterOptions(clients, "lastName")}
              onChange={handleFilter("lastName")}
            />
          </th>
          <th>
            <Filter
              type="filter-email"
              label="Email"
              options={makeFilterOptions(clients, "email")}
              onChange={() => {}}
            />
          </th>
          <th>
            <Filter
              type="filter-phone"
              label="Phone"
              options={makeFilterOptions(clients, "phone")}
              onChange={() => {}}
            />
          </th>
          <th>
            <Filter
              type="filter-city"
              label="City"
              options={makeFilterOptions(clients, "city")}
              onChange={() => {}}
            />
          </th>
          <th>
            <Filter
              type="filter-state"
              label="State"
              options={makeFilterOptions(clients, "state")}
              onChange={() => {}}
            />
          </th>
          {/* <th>
            <Filter
              type="filter-country"
              label="Country"
              options={makeFilterOptions(clients, "country")}
              onChange={() => {}}
            />
          </th> */}
          <th>
            <Filter
              type="filter-status"
              label="Status"
              options={makeFilterOptions(clients, "status")}
              onChange={handleFilter("status")}
            />
          </th>
          <th>
            <Filter type="filter-action" label="Action" />
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

const TableOptions = ({ searchText, setSearchText }) => {
  return (
    <div className="table-options">
      <SearchBox
        key="search-box"
        className="search-box"
        handleSearch={setSearchText}
      />
      {searchText.length > 0 && (
        <div className="search-text">
          Showing search results for: {searchText}
        </div>
      )}
      <div className="table-options-buttons">
        {/* <button
        className="table-options-button reset-filters button-text"
        onClick={resetFilters}
      >
        Reset Filters
      </button> */}
        {/* <button className="table-options-button add-btn">
        <MdAdd /> Add
      </button> */}
      </div>
    </div>
  );
};

const SearchArea = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    const getSearchResults = async () => {
      if (searchText.length > 0) {
        const results = await performSearch(clients, searchText);
        setFilteredClients(results);
      } else {
        setFilteredClients(clients);
      }
    };
    getSearchResults();
  }, [searchText]);

  useEffect(() => {
    const getClients = async () => {
      try {
        const {
          data: { data },
        } = await axios.get("http://52.53.219.188:4000/admin/get-all-user");

        // debugger;

        // const newClients = data;
        const newClients = makeClientsFromRes(data);
        setClients(newClients);
        setFilteredClients(newClients);

        // const newClients = makeClientsFromRes(data);
        setClients(newClients);
        setFilteredClients(newClients);
      } catch (err) {
        console.log(err);
      }
    };

    getClients();
  }, []);

  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem(
        "client", 
        JSON.stringify(clients[0])
      );
    }
  }, [clients]);

  const handleFilter = (type) => {
    return (e) => {
      const value = e.target.value;
      if (value === "" || value === "All") {
        setFilteredClients([...clients]);
      } else {
        setFilteredClients((curr) => {
          return curr.filter((client) => {
            return client[type] === value;
          });
        });
      }
    };
  };

  return (
    <div className="search-area">
      <h1> Clients </h1>
      <TableOptions searchText={searchText} setSearchText={setSearchText} />
      <ResultsTable
        className="searchResults"
        clients={filteredClients}
        handleFilter={handleFilter}
      />
    </div>
  );
};

export default SearchArea;
