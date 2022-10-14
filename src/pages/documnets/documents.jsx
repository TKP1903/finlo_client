import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./documents.css";
import {
  BsFillFolderFill,
  BsFolderCheck,
  BsThreeDotsVertical,
  BsFillCloudArrowUpFill,
} from "react-icons/bs";
import {AiOutlineFolderOpen} from "react-icons/ai";
import axios from "axios";
import { useEffect } from "react";


const DocumentsPage = () => {
  const [userDocs, setUserDocs] = useState();
  const [userFiles, setUserFiles] = useState([]);
  console.log(userDocs);
  const getUserFiles = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/file/get-user-docs/${user_id}`
      );
      console.log(response);
      setUserFiles(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userFiles);
  const uploadFile = async () => {
    let formData = new FormData();

    formData.append("file", userDocs);
    console.log(formData);
    try {
      const user_id = 0;
      const response = await axios.post(
        `http://localhost:4000/file/uploadfile/${user_id}`,
        formData,
        { data: "username" }
        // { headers: { "Content-Type": "multipart/form-data" } }
      );
      // const response = await axios({
      //   method: "post",
      //   url: "http://localhost:4000/file/uploadfile",
      //   data: formData,
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      if (response.status === 200) {
        alert("File uploaded successfully");
        getUserFiles(1);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Cant upload file");
    }
  };
  useEffect(() => {
    getUserFiles(1);
  }, []);
  return (
    <div className="document_container">
      <h3 className="page_heading">Documents</h3>
      <div className="documents_block">
        <div className="upload_block">
          <span className="upload_button">
            <BsFillFolderFill className="icon" />
            <input
              type="file"
              className="file_upload custom-file-input"
              onChange={(e) => setUserDocs(e.target.files[0])}
            />
          </span>
        </div>
        <div className="folder_block">
          {userFiles.length > 0 &&
            userFiles.map((data) => (
              <div className="folder">
                <span className="folder_name">
                  <BsFolderCheck className="icon" style={{ color: "#000" }} />
                  {data.document_name}
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
        <div className="folder_content_main">
          <div className="folder_content">
            <h1><AiOutlineFolderOpen className="folder_content_icon"/>2022 Tax_files
            <BsThreeDotsVertical className="folder_content_icon2"   /></h1>
          </div>   
        </div>
        
        <div className="upload-btn"> 
          <button className="submit_button" onClick={uploadFile}>
            <BsFillCloudArrowUpFill className="icon" />
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
