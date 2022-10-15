import React, { useState, useEffect } from "react";
import "./documents.css";
import "./userDocuments.css";
import {
  BsFillFolderFill,
  BsFolderCheck,
  BsThreeDotsVertical,
  BsFillCloudArrowUpFill,
} from "react-icons/bs";
import axios from "axios";
const UserDocumentsPage = ({ documentshandler, folders }) => {
  const [userFiles, setUserFiels] = useState([]);
  const [userDocs, setUserDocs] = useState();
  console.log(folders.name);
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
        alert("File uploaded successfully");
        getUserFiles(1);
      }
    } catch (error) {
      alert("Cant upload file");
    }
  };
  console.log(userDocs);
  useEffect(() => {
    getUserFiles(1);
  }, []);
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
          <button className="submit_button" onClick={uploadFile}>
            <BsFillCloudArrowUpFill className="icon" />
            Upload
          </button>
        </div>
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
