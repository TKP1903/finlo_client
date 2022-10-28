import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// pages
import HomePage from "./home/homepage";
import Documents from "./documents/documents";
import AdminPage from "./admin/admin";

import Profile from "./profile/Profile";
import { ToastContainer, toast } from "react-toastify";
import ContractsPage from "./admin/contract/Contracts.page";
import ContractPage from "./client_contract/ContractPage";

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
        {type === "admincontract" && <ContractsPage />}
        {type === "contract" && <ContractPage />}
      </div>
      <ToastContainer />
    </>
  );
};

export default Master;
