import React, { useState, useEffect } from "react";
import "./documents.css";
import "./userDocuments.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BsFileEarmark,
  BsUpload,
  BsFillCloudArrowUpFill,
} from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { API_URL } from "../../key";

const UserDocumentsPage = ({ documentshandler, folders }) => {
  const [userFiles, setUserFiels] = useState([]);
  const [userDocs, setUserDocs] = useState();
  const [newFileName, setNewFileName] = useState();
  const [clientDocId, setClientDocId] = useState();
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal5, setModal5] = useState(false);
  const user_id = localStorage.getItem("finlo_user_id");
  const user_name = localStorage.getItem("finlo_user_name");

  //get all user files
  const getUserFiles = async () => {
    try {
      const response = await axios.get(
        `${API_URL}file/get-user-docs/${user_id}/${folders.name}`
      );
      setUserFiels(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  //upload user files
  const uploadFile = async () => {
    let formData = new FormData();

    formData.append("file", userDocs);
    try {
      const response = await axios.post(
        `${API_URL}file/uploadfile/${user_id}/${folders.name}`,
        formData
      );
      if (response.status === 200) {
        toggleModal();
        alert("File uploaded successfully");
        getUserFiles(1);
      }
    } catch (error) {
      alert("Cant upload file");
    }
  };
  // delete specific file
  const deleteFile = async (fileName) => {
    try {
      const response = await axios.delete(`${API_URL}file/delete-file`, {
        data: {
          user_id,
          fileName,
        },
      });
      getUserFiles(user_id);
    } catch (error) {
      console.log(error);
    }
  };
  //update specific file
  const updateFileName = async () => {
    try {
      const response = await axios.put(`${API_URL}file/update-file-name`, {
        client_documents_id: clientDocId,
        user_id,
        updatedFileName: newFileName,
      });
      getUserFiles();
    } catch (error) {}
  };
  useEffect(() => {
    getUserFiles();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // Renane Modal
  const toggleModal1 = () => {
    setModal1(!modal1);
  };

  if (modal1) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // modal 2
  const toggleModal2 = () => {
    setModal2(!modal2);
  };

  if (modal2) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // Info Modal
  const toggleModal5 = () => {
    setModal5(!modal5);
  };

  if (modal5) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // toast.container
  const notify = () => {
    toast.success("File Name Changed Successfully!");
  };

  return (
    <div className="user_files_container">
      <div></div>
      <div className="file_upload_section">
        <label
          for="inputTag"
          style={{ cursor: "pointer" }}
          className="file-upload"
          onClick={() => {
            documentshandler(false, true, "", "");
          }}
        >
          <BiArrowBack className="icon" />
          Back
        </label>
        <div className="upload-btn">
          <button className="submit_button" onClick={toggleModal}>
            <BsFillCloudArrowUpFill className="icon" />
            Upload
          </button>
          {modal && (
            <div className="modal" style={{ zIndex: "2" }}>
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <div>
                  Upload Files <br />
                  <input
                    type="file"
                    className="upload-input"
                    onChange={(e) => setUserDocs(e.target.files[0])}
                  />
                </div>
                <div className="btn-section">
                  <button className="btn_overlay" onClick={uploadFile}>
                    Upload
                  </button>
                  <button className="btn_overlay" onClick={toggleModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upload modal */}
        {/* <div>
          <div className="upload_block">
            <span className="upload_button">
              <BsUpload className="icon" />
              <div className="folder_creation">
                <button onClick={toggleModal} className="btn-modal">
                  Upload
                </button>

                {modal && (
                  <div className="modal" style={{ zIndex: "2" }}>
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                      <div>
                        Upload Files <br />
                        <input type="file" className="upload-input" />
                      </div>
                      <div className="btn-section">
                        <button
                          className="btn_overlay"
                          // onClick={CreateFolder}
                        >
                          Upload
                        </button>
                        <button className="btn_overlay" onClick={toggleModal}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </span>
          </div>
        </div> */}
      </div>

      {/* Rename dropdown modal */}
      <div>
        {modal1 && (
          <div className="modal" style={{ zIndex: "4" }}>
            <div onClick={toggleModal1} className="overlay"></div>
            <div className="modal-content">
              <div>
                Rename File Name <br />
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setNewFileName(e.target.value)}
                />
              </div>
              <div className="btn-section">
                <button className="btn_overlay" onClick={updateFileName}>
                  Rename
                </button>
                <button className="btn_overlay" onClick={toggleModal1}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Modal  */}
      <div>
        {modal5 && (
          <div className="modal" style={{ zIndex: "4" }}>
            <div onClick={toggleModal5} className="overlay"></div>

            <div className="modal-content">
              {userFiles.map((data) => (
                <div>
                  <div style={{ padding: "10px" }}>
                    File Name : {data.document_name}{" "}
                  </div>
                  <div style={{ padding: "10px" }}>
                    {" "}
                    File Type : {data.document_type}{" "}
                  </div>
                  <div style={{ padding: "10px" }}>
                    {" "}
                    Uploaded Date and Time : {data.date} {data.time}
                  </div>
                  <div style={{ padding: "10px" }}>
                    {" "}
                    File size : {data.document_size}{" "}
                  </div>
                </div>
              ))}
              <div className="btn-section">
                <button className="btn_overlay" onClick={toggleModal5}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table */}

      {/* table end */}

      <div className="file_sections">
        <div className="folder_block">
          {userFiles.length > 0 &&
            userFiles.map((data) => (
              <div className="folder">
                <span className="folder_name">
                  <BsFileEarmark className="icon" style={{ color: "#000" }} />
                  {data.document_name}
                </span>
                <span>
                  {/* <BsThreeDotsVertical
                    className="icon"
                    style={{ color: "#000" }} onClick={toggleModal1}
                  /> */}
                  <div class="dropdown-container" tabindex="1">
                    <div class="three-dots"></div>
                    <div class="dropdown">
                      <a href="#">
                        <div onClick={notify}>Preview</div>
                      </a>
                      <a href="#">
                        <div
                          onClick={() => {
                            alert(data.client_documents_id);
                            setClientDocId(data.client_documents_id);
                            toggleModal5();
                          }}
                        >
                          Info
                        </div>
                      </a>
                      <a href="#">
                        <div onClick={toggleModal1}>Rename</div>
                      </a>
                      <div onClick={() => deleteFile(data.document_name)}>
                        <div>Delete</div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserDocumentsPage;
