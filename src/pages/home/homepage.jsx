import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./homepage.css";
import axios from "axios";

import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { MdOutlineUploadFile } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { API_URL } from "../../key";

// const AdminButton = () => {
//   return (
//     <Link to="/admin" className="btn-admin" style={{ color: "white" }}>
//       Admin
//     </Link>
//   );
// };

const HomePage = () => {
  //  modal delete button
  const [isAdmin, setIsAdmin] = useState(true);

  const [modal, setModal] = useState(false);
  const [deleteFileName, setDeleteFileName] = useState("");
  const user_id = localStorage.getItem("finlo_user_id");

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const [userFiles, setUserFiels] = useState([]);
  const getUserFiles = async () => {
    try {
      const response = await axios.get(
        `${API_URL}file/get-recent-user-docs/${user_id}`
      );
      setUserFiels(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFile = async () => {
    try {
      const response = await axios.delete(`${API_URL}file/delete-file`, {
        data: {
          user_id: user_id,
          fileName: deleteFileName,
        },
      });
      toggleModal();
      getUserFiles();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userFiles);

  useEffect(() => {
    getUserFiles();
    // setIsAdmin (localStorage.getItem("email") === "admin@finlo.com");
  }, []);

  import("./homepage.css");
  return (
    <>
      <div className="home-page-body">
        {/* {isAdmin ? <AdminButton /> : null} */}
        <div className="dashboard_block">
          <Link to="" className="gradientCard gradientBlue">
            <MdOutlineMiscellaneousServices
              style={{ width: "80px", height: "100px", padding: "10px" }}
            />
            <span>Services We Offer</span>
          </Link>
          <Link to="/documents" className="gradientCard gradientRed">
            <MdOutlineUploadFile
              style={{ width: "90px", height: "100px", padding: "10px" }}
            />
            <span>Upload Documents</span>
          </Link>
          <Link to="" className="gradientCard gradientGreen">
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
                <td>{data.created_date_time}</td>
                <td>{data.document_type}</td>
                <td>{Math.round(data.document_size / 1024)} kb</td>
                <td>
                  <button
                    onClick={() => {
                      setDeleteFileName(data.document_name);
                      toggleModal();
                    }}
                  >
                    Delete
                  </button>
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
                    <button
                      className="btn_overlay"
                      onClick={() => deleteFile()}
                    >
                      Delete
                    </button>
                    {/* {userFiles.map((data) => (
                      <button
                        className="btn_overlay"
                        onClick={() => deleteFile(data.customer_id, data.document_name)
                        }>
                        Delete
                      </button>
                    ))} */}
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
