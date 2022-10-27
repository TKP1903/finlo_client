import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { Link, useNavigate, useParams, NavLink } from "react-router-dom";
import logo from "../../assets/finlo_logo.png";
import UserAvatar from "react-user-avatar";

import { GoThreeBars } from "react-icons/go";

// icons
import { IoMdSettings } from "react-icons/io";
import { GoReport } from "react-icons/go";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { FaFileContract } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { IoHome, IoDocumentSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { MdPayment } from "react-icons/md";
import DocumentsIcon from "../../icons/documentsIcon";

import Master from "../../pages/master";

const navlistFactory = (mode) => {
  if (mode === "admin") {
    return [
      {
        name: "Client Documents",
        icon: <IoDocumentSharp />,
        path: "/documents?user_id=1",
      },
      {
        name: "Register a client",
        icon: <GiArchiveRegister />,
        path: "/admin",
      },
      {
        name: "Invoices/Contracts",
        icon: <FaFileContract />,
        path: "/invoices",
      },
      {
        name: "Employees",
        icon: <AiOutlineUsergroupDelete />,
        path: "/Employees",
      },
      {
        name: "Reports",
        icon: <GoReport />,
        path: "/reports",
      },
      {
        name: "Settings",
        icon: <IoMdSettings />,
        path: "/settings",
      },
    ];
  } else {
    return [
      {
        name: "Home",
        icon: <IoHome />,
        path: "/home",
      },
      {
        name: "Profile",
        icon: <ImProfile />,
        path: "/profile",
      },
      {
        name: "Documents",
        icon: <IoDocumentSharp />,
        path: "/documents",
      },
      {
        name: "Contract Proposal",
        icon: <ImProfile />,
        path: "/contract",
      },
      {
        name: "Payments",
        icon: <MdPayment />,
        path: "/payments",
      },
      {
        name: "Referral Program",
        icon: <ImProfile />,
        path: "/referral",
      },
    ];
  }
};

const NavList = ({ mode }) => {
  let navlist = navlistFactory(mode);
  return (
    <div className="nav-list">
      {!!navlist &&
        navlist.map((item, index) => (
          <NavLink
            to={item.path}
            className="nav-link"
            activeClassName="active"
            key={index}
          >
            <span className="nav-link-icon">
              {item.icon}
            </span>
            <span className="nav-link-name">{item.name}</span>
          </NavLink>
        ))}
    </div>
  );
};

const Header = ({ show, setShow, logouthandler, mode }) => {
  const client_name = localStorage.getItem("finlo_user_name");
  const user_role = localStorage.getItem("finlo_user_role");
  return (
    <header className={`header ${show ? "space-toggle" : null}`}>
      <div className="header-toggle" onClick={() => setShow(!show)}>
        <GoThreeBars className={` ${show ? "fa-solid fa-xmark" : null}`} />
      </div>
      <div className="log-avator">
        <div className="user_name">
          <h4>Welcome {user_role === "client" ? client_name : "Admin"}</h4>
        </div>
        <div className="useravatar">
          <UserAvatar
            size="42"
            name="Will Binns-Smith"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          />
        </div>
        <div className="btn-logout" onClick={logouthandler}>
          <IoMdLogOut className="nav-link-icon1" />
          <span className="hide">Logout</span>
        </div>
      </div>
    </header>
  );
};

const SideNav = ({ show }) => {
  const [mode, setMode] = useState(localStorage.user_role);

  useEffect(() => {
    setMode(localStorage.getItem("user_role"));
  }, []);
  console.log(mode);

  return (
    <aside className={`sidebar ${show ? "show" : null}`}>
      <nav className="nav">
        <div>
          <Link to="/" className="nav-logo">
            <i className={`${show ? "show-logo-icon" : "nav-logo-icon"}`}>F</i>
            <span className="nav-logo-name">
              <span className="logo-img">
                  <img src={logo} alt="" style={{ width: "100px", objectFit: "cover"}} />
              </span>
            </span>
          </Link>
          <NavList mode={mode} />
        </div>
      </nav>
    </aside>
  );
};

const Sidebar = ({ mode }) => {
  console.log({ mode });

  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const { type } = useParams();

  const logouthandler = () => {
    localStorage.removeItem("FinloUser");
    navigate("/");
  };

  return (
    <main className={show ? "space-toggle" : null}>
      <Header
        show={show}
        setShow={setShow}
        logouthandler={logouthandler}
        mode={mode}
      />

      <SideNav show={show} mode={mode} />

      <div className="master-wrap">
        <Master mode={mode} />
      </div>
    </main>
  );
};

export default Sidebar;
