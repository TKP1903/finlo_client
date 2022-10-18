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
  const getUserFiles = async (user_id) => {
    try {
      const response = await axios.get(
        `${API_URL}file/get-user-folders/${user_id}`
      );
      console.log(response?.data?.data);
      setUserFolders(response?.data?.data);
    } catch (error) {}
  };
  const user_id = 0;
  const uploadFile = async () => {
    let formData = new FormData();

    formData.append("file", userDocs);
    try {
      const response = await axios.post(
        `${API_URL}file/uploadfile/${user_id}`,
        formData,
        { data: "username" }
        // { headers: { "Content-Type": "multipart/form-data" } }
      );
      // const response = await axios({
      //   method: "post",
      //   url: "${API_URL}file/uploadfile",
      //   data: formData,
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      if (response.status === 200) {
        alert("File uploaded successfully");
        getUserFiles(1);
      }
    } catch (error) {
      alert("Cant upload file");
    }
  };
  const CreateFolder = async (event) => {
    event.preventDefault();
    setModal(!modal);
    try {
      const response = await axios.post(
        `${API_URL}file/uploadfolder/${user_id}/${folder_name}`
      );
      getUserFiles(1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserFiles(0);
  }, []);

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
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <span className="threedots" />
    </a>
  ));

  return (
    <div className="document_container">
      <h3 className="page_heading">Documents</h3>
      <div className="documents_block">
        <div className="upload_block">
          <span className="upload_button">
            <BsFillFolderFill className="icon" />
            <div className="folder_creation">
              <button onClick={toggleModal} className="btn-modal">
                New folder
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
                  <span>
                    {/* <BsThreeDotsVertical
                      className="icon"
                      style={{ color: "#000" }}
                      onClick={() => setEditFolder(!editFolder)}
                    /> */}
                    <div class="dropdown-container" tabindex="-1">
                      <div class="three-dots"></div>
                      <div class="dropdown">
                        <a href="#"><div>Rename</div></a>
                        <a href="#"><div>Delete</div></a>
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
