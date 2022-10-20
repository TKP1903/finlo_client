import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./documents.css";
import Dropdown from "react-bootstrap/Dropdown";

import {
  BsFillFolderFill,
  BsFolderCheck,
  BsThreeDotsVertical,
  BsUpload,
} from "react-icons/bs";
import { AiOutlineFolderOpen } from "react-icons/ai";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../../key";

const UserFoldersPage = ({ documentshandler }) => {
  const [userDocs, setUserDocs] = useState();
  const [userFolders, setUserFolders] = useState([]);
  const [modal, setModal] = useState(false);
  const [folder_name, setFolder_name] = useState("");
  const [create, setCreatefolder] = useState("");
  const [editFolder, setEditFolder] = useState(false);
  const [modal4, setModal4] = useState(false);
  const user_id = localStorage.getItem("finlo_user_id");

  const getUserFolders = async () => {
    try {
      const response = await axios.get(
        `${API_URL}folder/get-user-folders/${user_id}`
      );
      setUserFolders(response?.data?.data);
    } catch (error) {}
  };

  const uploadFile = async () => {
    let formData = new FormData();

    formData.append("file", userDocs);
    try {
      const response = await axios.post(
        `${API_URL}file/uploadfile/${user_id}`,
        formData,
        { data: "username" }
      );
      // const response = await axios({
      //   method: "post",
      //   url: "${API_URL}file/uploadfile",
      //   data: formData,
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      if (response.status === 200) {
        alert("File uploaded successfully");
        getUserFolders();
      }
    } catch (error) {
      alert("Cant upload file");
    }
  };
  const CreateFolder = async (event) => {
    event.preventDefault();
    setModal(!modal);
    try {
      const response = await axios.post(`${API_URL}folder/create-folder`, {
        user_id,
        folderName: folder_name,
        parentFolderName: "/",
      });
      getUserFolders();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserFolders();
  }, []);

  // Upload Modal
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  console.log(folder_name);
  const handleChange = (event) => {
    setFolder_name(event.target.value);
  };
  console.log(editFolder);

  // dropdown toggle
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <span className="threedots" />
    </a>
  ));

  // Renane Modal
  const toggleModal4 = () => {
    setModal4(!modal4);
  };

  if (modal4) {
    document.body.classList.add("active-modal4");
  } else {
    document.body.classList.remove("active-modal4");
  }

  return (
    <div className="document_container">
      <h3 className="page_heading">Documents</h3>
      <div className="documents_block">
        <div className="upload_block">
          <span className="upload_button">
            <BsFillFolderFill className="icon" />
            <div className="folder_creation">
              <button onClick={toggleModal} className="btn-modal">
                Add folder
              </button>
              {modal && (
                <div className="modal" style={{ zIndex: "1" }}>
                  <div onClick={toggleModal} className="overlay"></div>
                  <div className="modal-content">
                    <div>
                      Folder Name :{" "}
                      <input
                        type="text"
                        name="folder_name"
                        onChange={(e) => setFolder_name(e.target.value)}
                      />
                    </div>
                    <div className="btn-section">
                      <button className="btn_overlay" onClick={CreateFolder}>
                        Create
                      </button>
                      <button className="btn_overlay" onClick={toggleModal}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </span>
        </div>

        <div className="folder_block">
          {userFolders.length > 0
            ? userFolders.map((data) => (
                <div className="folder">
                  <span
                    className="folder_name"
                    onClick={() => {
                      documentshandler(true, false, "", `${data.folder_name}`);
                    }}
                  >
                    <BsFolderCheck className="icon" style={{ color: "#000" }} />
                    {data.folder_name}
                  </span>
                  <span className="editFolder">
                    {/* <BsThreeDotsVertical
                      className="icon"
                      style={{ color: "#000" }}
                      onClick={() => setEditFolder(!editFolder)}
                    /> */}

                    {/* Rename Modal */}
                    <div>
                      {modal4 && (
                        <div className="modal" style={{ zIndex: "1" }}>
                          <div className="overlay"></div>
                          <div className="modal-content">
                            <div>
                              Rename File Name <br />
                              <input type="text" name="" id="" />
                            </div>
                            <div className="btn-section">
                              <button className="btn_overlay">Rename</button>
                              <button
                                className="btn_overlay"
                                onClick={toggleModal4}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dropdown list 3 Dots */}
                    <div class="dropdown-container" tabindex="1">
                      <div class="three-dots"></div>
                      <div class="dropdown">
                        <a href="#">
                          <div onClick={toggleModal4}>Rename</div>
                        </a>
                        <a href="#">
                          <div>Delete</div>
                        </a>
                      </div>
                    </div>
                  </span>
                </div>
                // <div
                //   onClick={() => {
                //     documentshandler(true, false, "folder", "file");
                //   }}
                // >
                //   <AiOutlineFolderOpen className="folder_content_icon" />
                //   {data.folder_name}
                //   <BsThreeDotsVertical className="folder_content_icon2" />
                // </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default UserFoldersPage;
