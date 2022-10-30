import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// pages
import HomePage from "./home/homepage";
import Documents from "./documents/documents";
import AdminPage from "./admin/admin";

import Profile from "./profile/Profile";
import { ToastContainer, toast } from "react-toastify";

import ContractsPage from "./client_contract/ContractPage";

import AdminContracts_Invoices from "./admin/contracts_invoices";

import getUserRole from "../appFucntions/getUserRole";

const Master = ({ mode }) => {
  const { type } = useParams();

  const navigate = useNavigate();
  mode = getUserRole();

  return (
    <>
      <div>
        {type === "home" && <HomePage mode={mode} />}
        {/* {type === "documents" && <DocumentsPage />} */}

        {type === "documents" && <Documents mode={mode} />}

        {type === "admin" && <AdminPage mode={mode} />}
        { type === "admin-contracts-invoices" && <AdminContracts_Invoices mode={mode} />}
        
        {type === "profile" && <Profile mode={mode} />}

        {type === "contract" && <ContractsPage />}
      </div>
      <ToastContainer />
    </>
  );
};

export default Master;
