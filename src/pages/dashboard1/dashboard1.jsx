import React from "react";
import { Link } from "react-router-dom";
import "./dashboard1.css";

const DashBoard1 = () => {
  return (
    <div>
      <div className="dashboard_block">
        <Link to="" className="card1">
          <span>services we offer</span>
        </Link>
        <Link to="/documents" className="card2">
          <span>Upload Documents</span>
        </Link>
        <Link to="" className="card3">
          <span>Make Payment</span>
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default DashBoard1;
