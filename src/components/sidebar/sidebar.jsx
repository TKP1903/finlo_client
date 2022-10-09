import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

import { GoThreeBars } from "react-icons/go";
import { IoHome, IoDocumentSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { MdPayment } from "react-icons/md";
import FinloLogo from "../../assets/finlo_logo.png";

const Sidebar = () => {
  const [show, setShow] = useState(true);

  return (
    <main className={show ? "space-toggle" : null}>
      <header className={`header ${show ? "space-toggle" : null}`}>
        <div className="header-toggle" onClick={() => setShow(!show)}>
          <GoThreeBars className={` ${show ? "fa-solid fa-xmark" : null}`} />
        </div>
      </header>

      <aside className={`sidebar ${show ? "show" : null}`}>
        <nav className="nav">
          <div>
            <Link to="/" className="nav-logo">
              <i className={`${show ? "show-logo-icon" : "nav-logo-icon"}`}>
                F
              </i>
              <span className="nav-logo-name">Finlo</span>
            </Link>

            <div className="nav-list">
              <Link to="/dashboard" className="nav-link active">
                <IoHome className="nav-link-icon" />
                <span className="nav-link-name">Home</span>
              </Link>
              <Link to="/dashboard" className="nav-link">
                <ImProfile className="nav-link-icon" />
                <span className="nav-link-name">Profile</span>
              </Link>
              <Link to="/dashboard" className="nav-link">
                <IoDocumentSharp className="nav-link-icon" />
                <span className="nav-link-name">Documents</span>
              </Link>
              <Link to="/dashboard" className="nav-link">
                <ImProfile className="nav-link-icon" />
                <span className="nav-link-name">Contract Proposal</span>
              </Link>
              <Link to="/dashboard" className="nav-link">
                <MdPayment className="nav-link-icon" />
                <span className="nav-link-name">Payments</span>
              </Link>
              <Link to="/dashboard" className="nav-link">
                <ImProfile className="nav-link-icon" />
                <span className="nav-link-name">Referral Program</span>
              </Link>
            </div>
          </div>

          <Link to="/logout" className="nav-link">
            <IoMdLogOut className="nav-link-icon" />
            <span className="nav-link-name">Logout</span>
          </Link>
        </nav>
      </aside>

      <h1></h1>
    </main>
  );
};

export default Sidebar;
