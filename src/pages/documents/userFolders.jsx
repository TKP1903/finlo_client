import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./documents.css";
import Dropdown from "react-bootstrap/Dropdown";

import { Folder, File } from "./components";
import { Upload, createFolder, AddFolder } from "./components/popups";

import {
  BsFillFolderFill,
  BsCloudUploadFill,
  BsFolderCheck,
  BsThreeDotsVertical,
  BsUpload,
  BsFillCloudUploadFill,
} from "react-icons/bs";
import { AiOutlineFolderOpen } from "react-icons/ai";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../../key";

import getUserRole from "../../appFucntions/getUserRole";

const makeFoldersFromRes = (data) => {
  /**
   * @param {Array} data - array of objects
   * @returns {Array} - array of objects
   * @description - this function takes an array of objects and returns an array of objects
   * with the same data but with a new property called "folders" which is an array of objects
   *
   * {
   *  client_folders_id: 7,
   *  created_date_time: "2022-10-20 11:02:59",
   *  folder_name: "client_tax",
   *  parent_folder_name: "/",
   *  s3_folder_location: "https://finlo.s3.ap-south-1.amazonaws.com/client_tax/",
   *  updated_date_time: "2022-10-20 11:02:59",
   *  user_id: 6,
   * }
   *
   * {
   *  id: client_folders_id,
   *  name: folder_name,
   *  s3Path: s3_folder_location,
   *  parent: parent_folder_name,
   *  userId: user_id,
   *  created: created_date_time,
   *  updated: updated_date_time,
   * }
   */

  const folders = data.map((folder) => {
    return {
      id: folder.client_folders_id,
      name: folder.folder_name,
      s3Path: folder.s3_folder_location,
      parent: folder.parent_folder_name,
      userId: folder.user_id,
      // TODO :: convert the date to Date object
      created: folder.created_date_time,
      updated: folder.updated_date_time,
    };
  });
  return folders;
};

const makeFilesFromRes = (data) => {
  /**
   * @param {Array} data - array of objects
   * @returns {Array} - array of objects
   * @description - this function takes an array of objects and returns an array of objects
   * with the same data but with a new property called "files" which is an array of objects
   *
   * {
   *    "client_documents_id": 12,
   *    "user_id": 6,
   *    "document_name": "file_example_XLS_50.xls",
   *    "document_link": "https://finlo.s3.ap-south-1.amazonaws.com/client_tax/file_example_XLS_50.xls",
   *    "document_size": "13824",
   *    "document_type": "application/vnd.ms-excel",
   *    "folder_name": "client_tax",
   *    "created_date_time": "2022-10-20 11:02:59",
   *    "updated_date_time": "2022-10-20 11:02:59"
   *},
   *
   * {
   *    id: client_documents_id,
   *    name: document_name,
   *    link: document_link,
   *    size: document_size,
   *    type: document_type,
   *    folder: folder_name,
   *    userId: user_id,
   *    created: created_date_time,
   *    updated: updated_date_time,
   *
   * }
   */

  const files = data.map((file) => {
    return {
      id: file.client_documents_id,
      name: file.document_name,
      link: file.document_link,
      size: file.document_size,
      type: file.document_type,
      folder: file.folder_name,
      userId: file.user_id,
      // TODO :: convert the date to Date object
      created: file.created_date_time,
      updated: file.updated_date_time,
    };
  });
  return files;
};

const getUserIdFromUrl = () => {
  const url = window.location.href;
  const searchParams = new URLSearchParams(url);
  const userId = searchParams.get("userId");
  return userId;
};

const UserFoldersPage = ({ mode }) => {
  // const [userDocs, setUserDocs] = useState();

  // const [userFolders, setUserFolders] = useState([]);
  // const [userFiles, setUserFiles] = useState([]);

  const isAdmin = getUserRole() === "admin";

  const client = JSON.parse(localStorage.getItem("client"));

  const [fileStructure, setFileStructure] = useState({
    folders: [],
    files: [],
  });

  const [currentPath, setCurrentPath] = useState([""]);
  const [currentFolder, setCurrentFolder] = useState("");

  const user_id = isAdmin ? client.id : localStorage.getItem("finlo_user_id");
  console.log({ user_id });

  const getUserFolders = async (folder_name) => {
    try {
      const {
        data: { data },
      } = await axios.get(
        `${API_URL}folder/get-user-folders/${user_id}/${
          folder_name === "" ? "root" : folder_name
        }`
      );
      if (!data || !data.length) {
        return new Array();
      }
      const folders = makeFoldersFromRes(data) || [];
      folders.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      return folders;
    } catch (error) {
      console.log({ error });
      return [];
    }
  };

  const getUserFiles = async (folder_name) => {
    try {
      if (folder_name === "") {
        folder_name = "root";
      }
      const {
        data: { data },
      } = await axios.get(
        `${API_URL}file/get-user-docs/${user_id}/${folder_name}`
      );
      if (!data) {
        return new Array();
      }
      console.log({ data });
      const files = makeFilesFromRes(data.files) || [];
      files.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
      return files || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getFilesAndFolders = async (folder_name) => {
    if (folder_name === "") {
      folder_name = "root";
    }
    const folders = await getUserFolders(folder_name);
    const files = await getUserFiles(folder_name);
    const filesNfolders = { folders, files };

    return filesNfolders;
  };

  const uploadFile = async (file, parent_folder_name) => {
    if (parent_folder_name === "") {
      parent_folder_name = "root";
    }
    let formData = new FormData();

    formData.append("file", file);
    try {
      if (parent_folder_name === "") {
        parent_folder_name = "finlo";
      }
      const response = await axios.post(
        `${API_URL}file/uploadfile/${user_id}/${parent_folder_name}`,
        formData
        // TODO :: Implement the progress bar
        // {
        //   onUploadProgress: (progressEvent) => {
        //     const percentCompleted = Math.round(
        //       (progressEvent.loaded * 100) / progressEvent.total
        //     );
        //     console.log(`upload process: ${percentCompleted}%`);
        //   },
        // }
      );

      if (response.status === 200) {
        const files = await getUserFiles(currentPath[currentPath.length - 1]);
        setFileStructure((prev) => {
          return { ...prev, files };
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const createFolder = async (folder_name, parent_folder_name) => {
    console.log({ folder_name, parent_folder_name });
    try {
      if (parent_folder_name === "") {
        parent_folder_name = "root";
      }
      const response = await axios.post(`${API_URL}folder/create-folder`, {
        user_id,
        folderName: folder_name,
        parentFolderName: parent_folder_name,
      });
      // update the file structure
      if (response.status === 200) {
        const newFolders = await getUserFolders(
          currentPath[currentPath.length - 1]
        );
        setFileStructure((curr) => {
          return {
            ...curr,
            folders: newFolders,
          };
        });
      }
      return {
        isSuccess: true,
        res: response,
      };
    } catch (err) {
      console.log(err);
      return {
        isSuccess: false,
        res: err.response,
      };
    }
  };

  const deleteFolder = async (folderName) => {
    try {
      const response = await axios.delete(`${API_URL}folder/delete-folder`, {
        data: {
          folderName,
          user_id,
        },
      });
      if (response.status === 200) {
        const newFolders = await getUserFolders(
          currentPath[currentPath.length - 1]
        );
        setFileStructure((curr) => {
          return {
            ...curr,
            folders: newFolders,
          };
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const renameFolder = async (folder, newName) => {
    const folderId = folder.id;
    try {
      const response = await axios.put(`${API_URL}folder/update-folder-name`, {
        folderNewName: newName,
        folderName: folder.name,
        user_id,
        client_folders_id: folder.id,
      });
      if (response.status === 200) {
        // update the file structure
        setFileStructure((curr) => {
          // find the folder
          const folderIndex = curr.folders.findIndex(
            (folder) => folder.id === folderId
          );
          if (folderIndex === -1) {
            return curr;
          }
          const newFolders = [...curr.folders];
          newFolders[folderIndex].name = newName;
          return {
            ...curr,
            folders: newFolders,
          };
        });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const renameFile = async (file, newName) => {
    const fileId = file.id;
    try {
      const response = await axios.put(`${API_URL}file/update-file-name`, {
        client_documents_id: fileId,
        user_id,
        updatedFileName: newName,
      });
      if (response.status === 200) {
        // update the file structure
        setFileStructure((curr) => {
          // find the file
          const fileIndex = curr.files.findIndex((file) => file.id === fileId);
          if (fileIndex === -1) {
            return curr;
          }
          const newFiles = [...curr.files];
          newFiles[fileIndex].name = newName;
          return {
            ...curr,
            files: newFiles,
          };
        });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const deleteFile = async (file) => {
    try {
      const response = await axios.delete(`${API_URL}file/delete-file`, {
        data: {
          fileName: file.name,
          user_id,
        },
      });
      if (response.status === 200) {
        const newFiles = await getUserFiles(
          currentPath[currentPath.length - 1]
        );
        setFileStructure((curr) => {
          return {
            ...curr,
            files: newFiles,
          };
        });
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const filesNfolders = await getFilesAndFolders(
        currentPath[currentPath.length - 1]
      );
      setFileStructure(filesNfolders);
    })();
  }, [currentPath]);

  const addPath = (path) => {
    // push the path to the currentPath array
    setCurrentPath((curr) => [...curr, path]);
    setCurrentFolder(path);
  };

  const popPath = () => {
    setCurrentPath((curr) => {
      curr.pop();
      return curr;
    });
    setCurrentFolder(currentPath[currentPath.length - 1]);
  };

  const handleOpen = (folder_name) => {
    addPath(folder_name);
  };

  import("./userDocuments.css");
  return (
    <div className="document_container">
      <h3 className="page_heading">
        {" "}
        {isAdmin
          ? `${client.firstName} ${client.lastName}'s Documents`
          : "Documents"}{" "}
      </h3>
      <div className="documents_block">
        <div className="folder-options">
          <div className="folder-options-item breadcrumbs">
            {/* show the current path as breadcrumbs */}
            {currentPath.map((path, index) => (
              <>
                <span
                  key={path + index}
                  data-index={index}
                  className="breadcrumb-item"
                  onClick={(e) => {
                    // pop the path upto the index using
                    const newPath = currentPath.slice(0, index + 1);
                    setCurrentPath(newPath);
                    setCurrentFolder(newPath[newPath.length - 1]);
                    // setCurrentPath((curr) => {
                    //   return curr.slice(0, index + 1);
                    // });
                  }}
                >
                  {index === 0 && <span> HOME </span>}
                  <span>{path}</span>
                </span>
                <span>{" / "}</span>
              </>
            ))}
          </div>
        </div>
        <div className="folder-buttons">
          <div className="folder-btn">
            <AddFolder
              key={currentFolder}
              trigger={
                <button className="btn-primary btn-addFolder">
                  <BsFillFolderFill className="icon" /> Add folder
                </button>
              }
              handleAddFolder={createFolder}
              parentFolder={currentFolder}
            />
          </div>
          <div className="folder-btn">
            {/* Upload file button */}

            <Upload
              trigger={
                <button className="btn-primary btn-upload">
                  <BsFillCloudUploadFill className="icon" /> Upload
                </button>
              }
              handleUpload={uploadFile}
              parentFolder={currentFolder}
            />
          </div>
        </div>
        <div className="folder_block">
          {/* <Folder
            folder={{
              name: "Aashish",
              path: "/",
            }}
          /> */}
          {!!fileStructure.folders.length &&
            fileStructure.folders.map((data, index) => (
              <Folder
                key={`${data.name || "folder"}-${index}`}
                folder={data}
                handleOpen={handleOpen}
                handleDelete={deleteFolder}
                handleRename={renameFolder}
              />
            ))}
          {!!fileStructure.files.length &&
            fileStructure.files.map((data, index) => (
              <File
                key={`file-${index}`}
                file={data}
                handleDelete={deleteFile}
                handleRename={renameFile}
              />
            ))}
        </div>
      </div>
      {/* {isAdmin && <div className="clients-data"></div>} */}
    </div>
  );
};

export default UserFoldersPage;
