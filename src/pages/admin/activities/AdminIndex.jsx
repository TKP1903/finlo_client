import React from "react";
import { useState } from "react";
import ContractPage from "./contract/ContractsPage";
import "./index.css";
import Invoice from "./invoice/Invoice";
export const AdminIndex = () => {
  const [contract, setContract] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [flag, setFlag] = useState(false);
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
