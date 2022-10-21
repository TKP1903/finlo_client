import React from "react";
import { useParams } from "react-router-dom";

//pages
import HomePage from "./home/homepage";
import Documents from "./documents/documents";
import AdminPage from "./admin/admin";


import Profile from "./profile/Profile";

const Master = ({ mode }) => {
  const { type } = useParams();
  console.log({ type });
  return (
    <div>
      {type === "home" && <HomePage mode = {mode} />}
      {/* {type === "documents" && <DocumentsPage />} */}
      
      {type === "documents" && <Documents mode = {mode} />}
      
      {type === "admin" && <AdminPage mode={mode} />}
      {/* {type === "documents" && <Docuents />} */}
      {type === "profile" && <Profile mode={mode} />}

    </div>
  );
};

export default Master;
