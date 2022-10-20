import React from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
// useState, useEffect, useRef
import { useState, useEffect, useRef } from "react";

import {
  BsFillCloudArrowUpFill,
  BsFileEarmark,
  BsThreeDotsVertical,
  BsUpload,
} from "react-icons/bs";
import { RenameFile, ShowInfo, DeleteFile, Donwload } from "./popups";

const Menu = ({
  file,
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
            info={file}
            trigger={<div className="menu-item">Info</div>}
          />
          <RenameFile
            trigger={<div className="menu-item">Rename</div>}
            handleRename={handleRename}
          />
          <DeleteFile
            trigger={<div className="menu-item">Delete</div>}
            handleDelete={handleDelete}
          />
          <Donwload
            trigger={<div className="menu-item">Download</div>}
            handleDownload={handleDownload}
          />
        </div>
      )}
    </Popup>
  );
};

const emptyfunc = () => {};

/**
 * @param {object} file
 * 
 * @param {function} handleOpen
 * 
 * @param {function} handleRename
 * @param {function} handleDelete
 * @param {function} handleDownload
 * @param {function} handleSelect
 */
export const File = ({
  file,
  // menu fucntions
  handlePreview = emptyfunc,
  handleRename = emptyfunc,
  handleDelete = emptyfunc,
  handleDownload = emptyfunc,
}) => {
  import("./css/folder.css");
  return (
    <div className="folder">
      <span className="folder_name">
        <BsFileEarmark className="icon" style={{ color: "#000" }} />
        {file.name}
      </span>
      <Menu
        file={file}
        trigger={<div class="three-dots"></div>}
        handleRename={handleRename}
        handleDelete={handleDelete}
        handleDownload={handleDownload}
      />
    </div>
  );
};

export default File;