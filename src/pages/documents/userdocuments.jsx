import React, { useState, useEffect } from "react";
import "./documents.css";
import "./userDocuments.css";


import { BsFillCloudArrowUpFill} from "react-icons/bs";
import {BiArrowBack} from "react-icons/bi";
import axios from "axios";
import { API_URL } from "../../key";
const UserDocumentsPage = ({ documentshandler, folders }) => {
  const [userFiles, setUserFiels] = useState([]);
  const [userDocs, setUserDocs] = useState();
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  const getUserFiles = async (user_id) => {
    try {
      const response = await axios.get(
        `${API_URL}file/get-user-docs/${user_id}/${folders.name}`
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

  // modal 2
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


  // deletefile 

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
      {/* <div>
          {modal1 && (
            <div className="modal" style={{ zIndex: "4" }}>
              <div onClick={toggleModal1} className="overlay"></div>
              <div className="modal-content">
                <div>
                  Rename File Name  <br />
                  <input type="text" name="" id="" />
                  
                </div>
                <div className="btn-section">
                  <button className="btn_overlay" >
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
 */}

      {/* Table */}
      <div className="recent-uploads">
          <h1>File Uploaded</h1>
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
                  {/* <button onClick={toggleModal1}>Rename</button> */}
                  <button onClick={toggleModal2}>Delete</button>
                </td>
              </tr>
            ))}
          </table>
          <div className="folder_creation">
            {modal2 && (
              <div className="modal" style={{ zIndex: "5" }}>
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
                    <button className="btn_overlay" onClick={toggleModal2}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* table end */}

      {/* <div className="file_sections">
        <div className="folder_block">
          {userFiles.length > 0 &&
            userFiles.map((data) => (
              <div className="folder">
                <span className="folder_name">
                  <BsFileEarmark className="icon" style={{ color: "#000" }} />
                  {data.document_name}
                  File Name
                </span>
                <span>
                  <BsThreeDotsVertical
                    className="icon"
                    style={{ color: "#000" }} onClick={toggleModal1}
                  />
                </span>
                
              </div>
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default UserDocumentsPage;