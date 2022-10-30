import React from "react";
import { useState, useEffect } from "react";
import ContractPage from "./contract/ContractsPage";
import Invoice from "./invoice/Invoice";
// import "./index.css";
import getUserRole from "../../../appFucntions/getUserRole";

const Contracts_Invoices = ({ mode }) => {
  const [contract, setContract] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect (
    () => {
      mode = getUserRole();
    }, []
  );

  if (!!mode && mode != "admin") {
    return (
      <div>
        <h1>not authorized</h1>
        <h2> Please login with an admin account to access this page </h2>
      </div>
    );
  };

  import ("./index.css");
  return (
    <>
      {!flag&&
        <div className="adminbuttons" >
          <button
            onClick={() => {
              setContract(!contract);
              setInvoice(false);
              setFlag(true);
            }}
          >
            Create Contract
          </button>
          <button
            onClick={() => {
              setInvoice(!invoice);
              setContract(false);
              setFlag(true);
            }}
          >
            Create Invoice
          </button>
        </div>
      }
      
      {contract && <ContractPage back={setFlag} contract={setContract}/>}
      {invoice && <Invoice back={setFlag} invoice={setInvoice} />}
    </>
  );
};

export default Contracts_Invoices;