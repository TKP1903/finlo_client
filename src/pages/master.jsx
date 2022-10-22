import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// pages
import HomePage from "./home/homepage";
import Documents from "./documents/documents";
import AdminPage from "./admin/admin";

import Profile from "./profile/Profile";
import { ToastContainer, toast } from "react-toastify";

const Master = ({ mode }) => {
  const { type } = useParams();

  const navigate = useNavigate();
  mode = localStorage.user_role;
  return (
    <>
      <div>
        {type === "home" && <HomePage mode={mode} />}
        {/* {type === "documents" && <DocumentsPage />} */}

        {type === "documents" && <Documents mode={mode} />}

        {type === "admin" && <AdminPage mode={mode} />}
        {/* {type === "documents" && <Docuents />} */}
        {type === "profile" && <Profile mode={mode} />}
      </div>
      <ToastContainer />
    </>
  );
};

export default Master;
