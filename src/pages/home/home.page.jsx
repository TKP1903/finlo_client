import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import axios from "axios";

import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { MdOutlineUploadFile } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { API_URL } from "../../key";

const HomePage = () => {
  //  modal delete button
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const [userFiles, setUserFiels] = useState([]);
  const getUserFiles = async (user_id) => {
    try {
      const response = await axios.get(
        `${API_URL}file/get-recent-user-docs/${user_id}`
      );
      console.log(response?.data?.data);
      setUserFiels(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFile = async (user_id, documentName) => {
    try {
      const response = await axios.delete(`${API_URL}file/delete-file`, {
        data: {
          user_id: user_id,
          fileName: documentName,
        },
      });
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
              style={{ width: "80px", height: "100px", padding: "10px" }}
            />
            <span>Services We Offer</span>
          </Link>
          <Link to="/documents" className="card2">
            <MdOutlineUploadFile
              style={{ width: "90px", height: "100px", padding: "10px" }}
            />
            <span>Upload Documents</span>
          </Link>
          <Link to="" className="card3">
            <MdPayment
              style={{ width: "80px", height: "100px", padding: "10px" }}
            />
            <span>Make Payment</span>
          </Link>
        </div>
        <div className="recent-uploads">
          <h1>Recent Uploads</h1>
          <table>
            <tr className="tr-header">
              <th>File Name</th>
              <th>Uploaded Date & Time</th>
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
                  <button onClick={toggleModal}>Delete</button>
                </td>
              </tr>
            ))}
          </table>
          <div className="folder_creation">
            {modal && (
              <div className="modal" style={{ zIndex: "1" }}>
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                  <div>Are You Sure Want To Delete The Folder ?</div>
                  <div className="btn-section">
                    {userFiles.map((data) => (
                      <button
                        className="btn_overlay"
                        onClick={() => deleteFile(data.customer_id, data.document_name)
                        }>
                        Delete
                      </button>
                    ))}
                    <button className="btn_overlay" onClick={toggleModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
