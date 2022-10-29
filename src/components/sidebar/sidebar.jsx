import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import logo from "../../assets/finlo_logo.png";
import UserAvatar from "react-user-avatar";

// icons
import { AiFillCloseCircle } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { GoReport } from "react-icons/go";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { FaFileContract } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { IoHome, IoDocumentSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { MdPayment } from "react-icons/md";

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
        path: "/contract-admin",
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

const NavList = ({ mode, isExpanded }) => {
  let navlist = navlistFactory(mode);
  return (
    <div className="nav-list">
      {!!navlist &&
        navlist.map((item, index) => (
          <NavLink
            to={item.path}
            className="nav-link"
            style = {{
              "--tooltip-content": `${!isExpanded && `"${item.name}"`}`,
            }}
            key={`menu-item-${index}`}
          >
            <span className="nav-link-icon">{item.icon}</span>
            <span
              style={{
                "--transition-delay": `${index * 0.05}s`,
              }}
              className={`nav-link-name ${!isExpanded ? "hide" : ""}`}
            >
              {item.name}
            </span>
          </NavLink>
        ))}
    </div>
  );
};

const Header = ({ isExpanded, setIsExpanded, logoutHandler, mode }) => {
  const client_name = localStorage.getItem("finlo_user_name");
  const user_role = localStorage.getItem("finlo_user_role");
  const user_name = user_role === "client" ? client_name : "Admin";

  return (
    <header className="header">
      <div id="finloTax-logo">
        <img src={logo} alt="" style={{ width: "100px", objectFit: "cover" }} />
      </div>
      <div className="user-info">
        <div className="welcome-message">
          <h3 id="welcome-message">
            Welcome,
            <span id="user-name"> {user_name.split(" ")[0]}</span>
          </h3>
        </div>
        {/* <div className="user-avatar">
          <UserAvatar
            size="42"
            name={user_name}
            // src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          />
        </div> */}
        <button className="btn-primary logout-btn" onClick={logoutHandler}>
          <IoMdLogOut className="nav-link-icon1" />
          <span> Logout </span>
        </button>
      </div>
    </header>
  );
};

const SideNav = ({ isExpanded, setIsExpanded }) => {
  const [mode, setMode] = useState(localStorage.user_role);

  useEffect(() => {
    setMode(localStorage.getItem("user_role"));
  }, []);

  return (
    <>
      <nav className={`sidebar`}>
        <NavList mode={mode} isExpanded={isExpanded} />
        {!isExpanded && (
          <div
            className={`sidebar-menu-icon`}
            onClick={() => setIsExpanded((curr) => !curr)}
          >
            <BiMenu />
          </div>
        )}
        {isExpanded && (
          <div
            className="close-sidebar"
            onClick={() => setIsExpanded((curr) => !curr)}
          >
            <AiFillCloseCircle />
          </div>
        )}
      </nav>
    </>
  );
};

const Sidebar = ({ mode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { type } = useParams();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <main>
      <Header
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        logoutHandler={logoutHandler}
        mode={mode}
      />

      <SideNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} mode={mode} />

      <div className="master-wrap">
        <Master mode={mode} />
      </div>
    </main>
  );
};

export default Sidebar;
