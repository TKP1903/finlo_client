import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";

import {MdOutlineMiscellaneousServices} from "react-icons/md";
import {MdOutlineUploadFile} from "react-icons/md";
import {MdPayment} from "react-icons/md";




const HomePage = () => {
  return (
    <>
      <div>
        <div className="dashboard_block">
          <Link to="" className="card1">
            <MdOutlineMiscellaneousServices style={{width:"40px",height:"50px",padding:"10px"}}/>
            <span>Services we offer</span>
          </Link>
          <Link to="/documents" className="card2">
            <MdOutlineUploadFile style={{width:"40px",height:"50px",padding:"10px"}} />
            <span>Upload Documents</span>
          </Link>
          <Link to="" className="card3">
            <MdPayment style={{width:"40px",height:"50px",padding:"10px"}} />
            <span>Make Payment</span>
          </Link>
        </div>
        <div className="recent-uploads">
        <h1>Recent uploads</h1>
            <table>
                <tr>
                  <th>Doc Name</th>
                  <th>Uploaded By</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
                <tr>
                  <td>FY 22-23.docx</td>
                  <td>john</td>
                  <td>10/06/2022</td>
                  <td><button>Action</button><button >Delete</button></td>
                </tr>
            </table>
        </div>
      </div>
    </>
  );
};

export default HomePage;
