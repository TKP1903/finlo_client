// react boilerplate imports
import React from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
// useState, useEffect, useRef
import { useState, useEffect, useRef } from "react";

// icons
import {
  BsFillFolderFill,
  BsFolderCheck,
  BsThreeDotsVertical,
  BsUpload,
} from "react-icons/bs";

import debounce from "../../../jsFunctions/debounce";
import { RenameFolder, ShowInfo, DeleteFolder, Donwload } from "./popups";

const Menu = ({
  folder,
  trigger,
  handleRename,
  handleDelete,
  handleDownload,
}) => {
  let newName;

  return (
    <Popup trigger={trigger} nested position="bottom right">
      {(close1) => (
        <div className="folder-menu">
          {/* <Popup trigger={<div className="menu-item">Rename</div>} modal nested>
            {(close2) => (
              <div className="prompt-input">
                <div className="close-icon" onClick={close1} />
                <h2> Rename the Folder </h2>
                <input
                  type="text"
                  placeholder="Enter new name"
                  onChange={debounce((e) => {
                    newName = e.target.value;
                    console.log(newName);
                  })}
                />
                <Popup
                  trigger={<button className="btn-primary"> Rename </button>}
                  modal
                  position="bottom right"
                >
                  <div className="prompt confirm-popup">
                    <h2> Are you sure you want to rename this folder? </h2>
                    <button
                      className="btn-primary"
                      onClick={async() => {
                        await handleRename(newName)
                        close1();
                      }}
                    >
                      {" "}
                      Yes{" "}
                    </button>
                    <button className="btn-primary" onClick={close1}> No </button>
                  </div>
                </Popup>
              </div>
            )}
          </Popup> */}
          <ShowInfo
            info={folder}
            trigger={<div className="menu-item">Info</div>}
          />
          {/* <RenameFolder
            trigger={<div className="menu-item">Rename</div>}
            handleRenameFolder={(newName)=> handleRename(folder, newName)}
          /> */}
          <DeleteFolder
            trigger={<div className="menu-item">Delete</div>}
            handleDeleteFolder={async () => {
              const isSuccess = await handleDelete(folder.name);
              if (isSuccess) close1();
              else alert("Error deleting folder");
            }}
          />
          {/* <Donwload
            trigger={<div className="menu-item">Download</div>}
            handleDownload={handleDownload}
          /> */}
        </div>
      )}
    </Popup>
  );
};

const emptyfunc = () => {};

/**
 * @param {object} folder
 *
 * @param {function} handleOpen
 *
 * @param {function} handleRename
 * @param {function} handleDelete
 * @param {function} handleDownload
 * @param {function} handleSelect
 */
export const Folder = ({
  folder,
  // folder functions
  handleSelect = emptyfunc,
  handleOpen = emptyfunc,

  // menu fucntions
  handleRename = emptyfunc,
  handleDelete = emptyfunc,
  handleDownload = emptyfunc,
}) => {
  import("./css/folder.css");
  return (
    <div
      className="folder"
      onClick={() => {
        handleOpen(folder.name);
      }}
    >
      <span className="folder_name">
        <BsFolderCheck className="icon" style={{ color: "#000" }} />
        {folder.name}
      </span>
      <Menu
        folder={folder}
        trigger={<div class="three-dots"></div>}
        handleRename={handleRename}
        handleDelete={handleDelete}
        handleDownload={handleDownload}
      />
    </div>
  );
};

export default Folder;
