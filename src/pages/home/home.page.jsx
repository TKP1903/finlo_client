import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import axios from "axios";

import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { MdOutlineUploadFile } from "react-icons/md";
import { MdPayment } from "react-icons/md";

const HomePage = () => {
  const [userFiles, setUserFiels] = useState([]);
  const getUserFiles = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/file/get-recent-user-docs/${user_id}}`
      );
      console.log(response?.data?.data);
      setUserFiels(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFile = async (user_id, documentName) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/file/delete-file`,
        {
          data: {
            user_id: user_id,
            fileName: documentName,
          },
        }
      );
      getUserFiles(user_id);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userFiles);
  useEffect(() => {
    getUserFiles(0);
  }, []);
  return (
    <>
      <div>
        <div className="dashboard_block">
          <Link to="" className="card1">
            <MdOutlineMiscellaneousServices
              style={{ width: "80px", height: "70px", padding: "10px" }}
            />
            <span>Services We Offer</span>
          </Link>
          <Link to="/documents" className="card2">
            <MdOutlineUploadFile
              style={{ width: "80px", height: "70px", padding: "10px" }}
            />
            <span>Upload Documents</span>
          </Link>
          <Link to="" className="card3">
            <MdPayment
              style={{ width: "80px", height: "70px", padding: "10px" }}
            />
            <span>Make Payment</span>
          </Link>
        </div>
        <div className="recent-uploads">
          <h1>Recent Uploads</h1>
          <table>
            <tr className="tr-header">
              <th>File Name</th>
              <th>Uploaded Date & Time </th>
              <th>File type</th>
              <th>File size</th>
              <th>Action</th>
            </tr>
            {userFiles.map((data) => (
              <tr>
                <td>{data.document_name}</td>
                <td>
                  {data.date} {data.time}
                </td>
                <td>{data.document_type}</td>
                <td>{data.document_size}</td>
                <td>
                  <button
                    onClick={() =>
                      deleteFile(data.customer_id, data.document_name)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default HomePage;
