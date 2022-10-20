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

const Menu = ({
  info,
  trigger,
  handleRename,
  handleDelete,
  handleDownload,
}) => {
  let newName;

  return (
    <Popup trigger={trigger} nested position="bottom right">
      {(close) => (
        <div className="folder-menu">
          <Popup trigger={<div className="menu-item">Rename</div>} modal nested>
            {(close) => (
              <div className="prompt-input">
                <div className="close-icon" onClick={close} />
                <h2> Rename the Folder </h2>
                <input
                  type="text"
                  placeholder="Enter new name"
                  onChange={(e) => {
                    newName = e.target.value;
                    console.log(newName);
                  }}
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
                      onClick={() => handleRename(newName)}
                    >
                      {" "}
                      Yes{" "}
                    </button>
                    <button className="btn-primary"> No </button>
                  </div>
                </Popup>
              </div>
            )}
          </Popup>
        </div>
      )}
    </Popup>
  );
};

const emptyfunc = () => {};

/**
 * @param {object} folder
 * @param {string} folder.name
 * @param {string} folder.path
 * @param {object} folder.info
 * @param {string} folder.info.items
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
    <div className="folder">
      <span className="folder_name">
        <BsFolderCheck className="icon" style={{ color: "#000" }} />
        {folder.name}
      </span>
      <Menu
        info={folder.info}
        trigger={<div class="three-dots"></div>}
        handleRename={handleRename}
        handleDelete={handleDelete}
        handleDownload={handleDownload}
      />
    </div>
  );
};

export default Folder;
