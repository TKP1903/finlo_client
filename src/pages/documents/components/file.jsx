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
import {
  ShowInfo,
  DeleteFile,
  Donwload,
  FilePreview,
} from "./popups";

const Menu = ({
  file,
  trigger,
  handleDelete,
  handleDownload,
}) => {
  let newName;

  return (
    <Popup trigger={trigger} nested position="bottom right">
      {(close1) => (
        <div className="folder-menu">
          <ShowInfo
            info={file}
            trigger={<div className="menu-item">Info</div>}
          />
          <FilePreview
            trigger={<div className="menu-item">Preview</div>}
            file={file}
          />
          <DeleteFile
            trigger={<div className="menu-item">Delete</div>}
            handleDeleteFile={() => handleDelete(file)}
          />
          <Donwload
            trigger={<div className="menu-item">Download</div>}
            handleDownloadFile={() => handleDownload(file)}
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
 * @param {function} handleDelete
 * @param {function} handleDownload
 * @param {function} handleSelect
 */
export const File = ({
  file,
  // menu fucntions
  handlePreview = emptyfunc,
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
        handleDelete={handleDelete}
        handleDownload={handleDownload}
      />
    </div>
  );
};

export default File;
