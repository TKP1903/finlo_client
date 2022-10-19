import React, { useState } from "react";
import "./sidebar.css";
import { Link, useNavigate, useParams ,NavLink} from "react-router-dom";
import logo from "../../assets/finlo_logo.png"
import UserAvatar from "react-user-avatar";

import { GoThreeBars } from "react-icons/go";
import { IoHome, IoDocumentSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { MdPayment } from "react-icons/md";
import Master from "../../pages/master";


const Sidebar = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const { type } = useParams();
  const logouthandler = () => {
    localStorage.removeItem("FinloUser");
    navigate("/");
  };

  return (
    <main className={show ? "space-toggle" : null}>
      <header className={`header ${show ? "space-toggle" : null}`}>
        <div className="header-toggle" onClick={() => setShow(!show)}>
          <GoThreeBars className={` ${show ? "fa-solid fa-xmark" : null}`} />
        </div>
        <div className="log-avator">
        <div className="useravatar">
          <UserAvatar size="42" name="Will Binns-Smith" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
          </div>
          <div className="btn-logout" onClick={logouthandler}>
              <IoMdLogOut className="nav-link-icon1"  />
              <span className="nav-link-name">Logout</span>
          </div>
        </div>
      </header>

      <aside className={`sidebar ${show ? "show" : null}`}>
        <nav className="nav">
          <div>
            <Link to="/" className="nav-logo">
              <i className={`${show ? "show-logo-icon" : "nav-logo-icon"}`}>
                F
              </i>
              <span className="nav-logo-name">
                 <span className="logo-img">
                    <img src={logo} alt="" style={{ width: "100px" }} />
                 </span>
              </span> 
            </Link>

            <div className="nav-list" >
              <NavLink to="/home" className="nav-link " activeClassName="active">
                <IoHome className="nav-link-icon" />
                <span className="nav-link-name ">Home</span>
              </NavLink>
              <Link to="/" className="nav-link" >
                <ImProfile className="nav-link-icon" />
                <span className="nav-link-name">Profile</span>
              </Link>
              <NavLink to="/documents" className="nav-link" >
                <IoDocumentSharp className="nav-link-icon" />
                <span className="nav-link-name">Documents</span>
              </NavLink>
              <Link to="/" className="nav-link" >
                <ImProfile className="nav-link-icon" />
                <span className="nav-link-name">Contract Proposal</span>
              </Link>
              <Link to="/" className="nav-link" >
                <MdPayment className="nav-link-icon" />
                <span className="nav-link-name">Payments</span>
              </Link>
              <Link to="/" className="nav-link" >
                <ImProfile className="nav-link-icon" />
                <span className="nav-link-name">Referral Program</span>
              </Link>
            </div>
          </div>
        </nav>
      </aside>
      <div className="master-wrap">
        <Master />
      </div>
    </main>
  );
};

export default Sidebar;
