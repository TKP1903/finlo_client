import React, { useState, useEffect } from "react";
import "./documents.css";
import "./userDocuments.css";


import {
  BsFillFolderFill,
  BsFolderCheck,
  BsThreeDotsVertical,
  BsFillCloudArrowUpFill,
  BsUpload,
} from "react-icons/bs";
import axios from "axios";
const UserDocumentsPage = ({ documentshandler, folders }) => {
  const [userFiles, setUserFiels] = useState([]);
  const [userDocs, setUserDocs] = useState();
  const [modal, setModal] = useState(false);

  const getUserFiles = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/file/get-user-docs/${user_id}/${folders.name}`
      );
      setUserFiels(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async () => {
    let formData = new FormData();

    formData.append("file", userDocs);
    const user_id = 0;
    try {
      const response = await axios.post(
        `http://localhost:4000/file/uploadfile/${user_id}/${folders.name}`,
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
  useEffect(() => {
    getUserFiles(1);
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <div className="user_files_container">
      <div></div>
      <div className="file_upload_section ">
        <label
          for="inputTag"
          style={{ cursor: "pointer" }}
          className="file-upload"
        >
          <BsFillFolderFill className="icon" />
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
      <div className="file_sections">
        <div className="folder_block">
          {userFiles.length > 0 &&
            userFiles.map((data) => (
              <div className="folder">
                <span className="folder_name">
                  <BsFolderCheck className="icon" style={{ color: "#000" }} />
                  {data.document_name}
                  File Name
                </span>
                <span>
                  <BsThreeDotsVertical
                    className="icon"
                    style={{ color: "#000" }}
                  />
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserDocumentsPage;