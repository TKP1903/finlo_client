// Component for the admin page
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// custom components
// import {RegisterForm, SearchArea} from "./components";
import RegisterForm  from "./components/registerForm";
import SearchArea from "./components/searchArea";

const Admin = ({mode}) => {
  const navigate = useNavigate ();

  const [ userRole , setUserRole ] = useState (localStorage.getItem ("user_role"));

  
  useEffect(
    () => {
      setUserRole (localStorage.getItem ("user_role"));
    }, []
  );
  
  import ("./admin.css");
  
  if (userRole !== "admin") {
    return <div>Not authorized</div>;
  }
  
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
