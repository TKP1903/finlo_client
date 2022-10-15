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
            <MdOutlineMiscellaneousServices
              style={{ width: "40px", height: "50px", padding: "10px" }}
            />
            <span>Services We Offer</span>
          </Link>
          <Link to="/documents" className="card2">
            <MdOutlineUploadFile
              style={{ width: "40px", height: "50px", padding: "10px" }}
            />
            <span>Upload Documents</span>
          </Link>
          <Link to="" className="card3">
            <MdPayment
              style={{ width: "40px", height: "50px", padding: "10px" }}
            />
            <span>Make Payment</span>
          </Link>
        </div>
        <div className="recent-uploads">
          <h1>Recent Uploads</h1>
          <table>
            <tr className="tr-header">
              <th>File Name</th>
              <th>Uploaded Date & Time  </th>
              <th>File type</th>
              <th>File size</th>
              <th>Action</th>
            </tr>
            <tr >
              <td>FY 22-23</td>
              <td>23/06/2022 12:00 PM</td>
              <td>docx</td>
              <td>1.06 MB</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>     
            <tr>
              <td>FY 22-23</td>
              <td>23/06/2022 5:00 PM</td>
              <td>docx</td>
              <td>1.58 MB</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>     
            <tr>
              <td>FY 22-23</td>
              <td>23/06/2022 4:00 AM</td>
              <td>docx</td>
              <td>4.06 MB</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>        
          </table>
        </div>
      </div>
    </>
  );
};

export default HomePage;
