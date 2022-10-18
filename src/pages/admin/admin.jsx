// Component for the admin page
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";

import { API_URL } from "../../key";
import axios from "axios";

import "./admin.css";

const RegisterForm = () => {
  // TODO :: make a ref to the form element
  const formRef = useRef ();
  
  // TODO :: Implement the following methods 
  const submitForm = () => {

  };
  
  const resetForm = () => {

  };

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
            <label htmlFor="first-name"> First Name: </label>
            <label htmlFor="email"> Email: </label>
            <label htmlFor="country"> Country: </label>
            <label htmlFor="city"> City: </label>
            <label htmlFor="branch-office"> Branch Office: </label>
            <label htmlFor="source"> Source: </label>
          </div>
          <div className="form-inputs">
            <input type="text" name="first-name" id="first-name" />
            <input type="email" name="email" id="email" />
            <input type="text" name="country" id="country" />
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
            <label htmlFor="sales"> Sales: </label>
            <label htmlFor="employee"> Employee: </label>
            <label htmlFor="status"> Status: </label>
          </div>
          <div className="form-inputs">
            <input type="text" name="last-name" id="last-name" />
            <input type="number" name="phone-number" id="phone-number" />
            <input type="text" name="state" id="state" />
            <input type="text" name="sales" id="sales" />
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
        <button type="submit" onClick = {submitForm}> Submit </button>
        <button type="reset" onClick = {resetForm}> Cancel </button>
      </div>
    </div>
  );
};

const SearchArea = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [clients, setClients] = useState([]);

  
  // 2 dummuy clients
  const dummyClients = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "jhonedoe@xyz.com",
      phone: "1234567890",
      branchOffice: "office1",
      sales: "sales",
      employee: "raju",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      email: "jhonedoe@xyz.com",
      phone: "1234567890",
      branchOffice: "office1",
      sales: "sales",
      employee: "raju",
    },
  ];

  useEffect(() => {
    setClients(dummyClients);
    // const getClients = async () => {
    //     try {
    //         const response = await axios.get(`${API_URL}client/get-clients`);
    //         setClients(response?.data?.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // getClients();
  }, [search]);

  const ResultsTable = ({clients, className}) => {
    const clientsList = clients.map ((client)=> {
        return (
            <tr>  
                <td> { client.firstName } </td>
                <td> { client.email } </td>
                <td> { client.branchOffice } </td>
                <td> { client.lastName } </td>
                <td> { client.phone } </td>
                <td> { client.sales } </td>
                <td> { client.employee } </td>
            </tr>
        );
    });
    return (
        <table className={className}>
        {/* 
        *   FirstName : String
        *   Email : Email
        *   Branch-Office: String
        *   LastName : String
        *   Phone : String
        *   Sales : String
        *   Employee : String
        */}
        <thead>
            <th> First Name </th>
            <th> Email </th>
            <th> Branch Office </th>
            <th> Last Name </th>
            <th> Phone </th>
            <th> Sales </th>
            <th> Employee </th>
        </thead>
        <tbody>
             { clientsList }
        </tbody>
        </table>
    );
  };

  const performSearch = async() => {
    // TODO :: implement perform search to fetch results from the backend

  };

  return (
    <div className="searchArea">
      <h2> Search Resuts: </h2>
      <div className="searchBox">
        <input type="text" placeholder="Search" />
        <MdSearch className="searchIcon" onClick = {performSearch}/>
      </div>
      <ResultsTable className ="searchResults" clients = {clients} />
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
      <div className="admin-page-footer">
        &copy; Finlo Inc, 2022
      </div>
    </div>
  );
};

export default Admin;