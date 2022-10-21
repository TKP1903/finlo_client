import React from "react";
import Popup from "reactjs-popup";

import { AiFillCloseCircle } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import("reactjs-popup/dist/index.css");
import "./css/popups.css";

const TestModal = ({ trigger, content, position }) => {
  import("reactjs-popup/dist/index.css");
  return (
    <Popup
      trigger={<button className="button"> Open Modal </button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Modal Title </div>
          <div className="content">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
            nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
            quibusdam voluptates delectus doloremque, explicabo tempore dicta
            adipisci fugit amet dignissimos?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur sit commodi beatae optio voluptatum sed eius cumque,
            delectus saepe repudiandae explicabo nemo nam libero ad, doloribus,
            voluptas rem alias. Vitae?
          </div>
          <div className="actions">
            <Popup
              trigger={<button className="button"> Trigger </button>}
              position="top center"
              nested
            >
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                magni omnis delectus nemo, maxime molestiae dolorem numquam
                mollitia, voluptate ea, accusamus excepturi deleniti ratione
                sapiente! Laudantium, aperiam doloribus. Odit, aut.
              </span>
            </Popup>
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

const AddFolder = ({ trigger, handleAddFolder, parentFolder }) => {
  let newName;
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className="prompt-input">
          <div className="close-icon" onClick={close}>
            <AiFillCloseCircle />
          </div>
          <h2> Add a new Folder </h2>
          <input
            type="text"
            placeholder="Enter new name"
            onChange={(e) => {
              newName = e.target.value;
              console.log(newName);
            }}
          />
          <Popup
            trigger={<button className="btn-primary"> Add </button>}
            modal
            position="bottom right"
          >
            <div className="prompt confirm-popup">
              <h2> Are you sure you want to add this folder? </h2>
              <button
                className="btn-primary"
                onClick={async () => {
                  await handleAddFolder(newName, parentFolder);
                  close();
                }}
              >
                {" "}
                Yes{" "}
              </button>
              <button className="btn-primary" onClick={close}>
                {" "}
                No{" "}
              </button>
            </div>
          </Popup>
        </div>
      )}
    </Popup>
  );
};

const AddFile = ({ trigger, handleAddFile }) => {
  let newName;
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className="prompt-input">
          <div className="close-icon" onClick={close}>
            <AiFillCloseCircle />
          </div>
          <h2> Add a new File </h2>
          <input
            type="text"
            placeholder="Enter new name"
            onChange={(e) => {
              newName = e.target.value;
              console.log(newName);
            }}
          />
          <Popup
            trigger={<button className="btn-primary"> Add </button>}
            modal
            position="bottom right"
          >
            <div className="prompt confirm-popup">
              <h2> Are you sure you want to add this file? </h2>
              <button
                className="btn-primary"
                onClick={async () => {
                  await handleAddFile(newName);
                  close();
                }}
              >
                {" "}
                Yes{" "}
              </button>
              <button className="btn-primary" onClick={close}>
                {" "}
                No{" "}
              </button>
            </div>
          </Popup>
        </div>
      )}
    </Popup>
  );
};

const DeleteFolder = ({ trigger, handleDeleteFolder }) => {
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className="prompt confirm-popup">
          <div className="close-icon" onClick={close}>
            <AiFillCloseCircle />
          </div>
          <h2> Are you sure you want to delete this folder? </h2>
          <button
            className="btn-primary"
            onClick={() => {
              handleDeleteFolder();
              // TODO :: show a success/fail message
              close();
            }}
          >
            {" "}
            Yes{" "}
          </button>
          <button className="btn-primary" onClick={close}>
            {" "}
            No{" "}
          </button>
        </div>
      )}
    </Popup>
  );
};

const DeleteFile = ({ trigger, handleDeleteFile }) => {
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className="prompt confirm-popup">
          <div className="close-icon" onClick={close}>
            <AiFillCloseCircle />
          </div>
          <h2> Are you sure you want to delete this file? </h2>
          <button
            className="btn-primary"
            onClick={async () => {
              const isSuccess = await handleDeleteFile();
              // TODO :: show a success/fail message
              close();
            }}
          >
            {" "}
            Yes{" "}
          </button>
          <button className="btn-primary" onClick={close}>
            {" "}
            No{" "}
          </button>
        </div>
      )}
    </Popup>
  );
};

const RenameFolder = ({ trigger, handleRenameFolder }) => {
  let newName;
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className="prompt-input">
          <div className="close-icon" onClick={close}>
            <AiFillCloseCircle />
          </div>
          <h2> Rename Folder </h2>
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
                onClick={async () => {
                  await handleRenameFolder(newName);
                  close();
                }}
              >
                {" "}
                Yes{" "}
              </button>
              <button className="btn-primary" onClick={close}>
                {" "}
                No{" "}
              </button>
            </div>
          </Popup>
        </div>
      )}
    </Popup>
  );
};

const RenameFile = ({ trigger, handleRenameFile }) => {
  let newName;
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className="prompt-input">
          <div className="close-icon" onClick={close}>
            <AiFillCloseCircle />
          </div>
          <h2> Rename File </h2>
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
              <h2> Are you sure you want to rename this file? </h2>
              <button
                className="btn-primary"
                onClick={async () => {
                  await handleRenameFile(newName);
                  close();
                }}
              >
                {" "}
                Yes{" "}
              </button>
              <button className="btn-primary" onClick={close}>
                {" "}
                No{" "}
              </button>
            </div>
          </Popup>
        </div>
      )}
    </Popup>
  );
};

const ShowInfo = ({ trigger, info }) => {
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <>
          <div className="prompt">
            <div className="close-icon" onClick={close}>
              <AiFillCloseCircle />
            </div>
            <h2> Info </h2>
            <div className="info">
              <div className="info-item">
                <span className="info-item-key"> Name: </span>
                <span className="info-item-value"> {info.name} </span>
              </div>
              <div className="info-item">
                <span className="info-item-key"> Type: </span>
                <span className="info-item-value"> {info.type} </span>
              </div>
              <div className="info-item">
                <span className="info-item-key"> Size: </span>
                <span className="info-item-value"> {info.size} </span>
              </div>
              <div className="info-item">
                <span className="info-item-key"> Created at: </span>
                <span className="info-item-value"> {info.created} </span>
              </div>
              <div className="info-item">
                <span className="info-item-key"> Last modified at: </span>
                <span className="info-item-value"> {info.updated} </span>
              </div>
            </div>
          </div>
          {/* close on click outside */}
          <div
            onClick={close}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </>
      )}
    </Popup>
  );
};

const Donwload = ({ trigger, handleDownload }) => {
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className="prompt confirm-popup">
          <div className="close-icon" onClick={close}>
            <AiFillCloseCircle />
          </div>
          <h2> Are you sure you want to download this file? </h2>
          <button
            className="btn-primary"
            onClick={async () => {
              await handleDownload();
              close();
            }}
          >
            {" "}
            Yes{" "}
          </button>
          <button className="btn-primary" onClick={close}>
            {" "}
            No{" "}
          </button>
        </div>
      )}
    </Popup>
  );
};

const Upload = ({ trigger, handleUpload, parentFolder }) => {
  let file;
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className="prompt-input">
          <div className="close-icon" onClick={close}>
            <AiFillCloseCircle />
          </div>
          <h2> Upload a File </h2>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              file = e.target.files[0];
              console.log(file);
            }}
          />
          <Popup
            trigger={<button className="btn-primary"> Upload </button>}
            modal
            position="bottom right"
          >
            <div className="prompt confirm-popup">
              <h2> Are you sure you want to upload this file? </h2>
              <button
                className="btn-primary"
                onClick={async () => {
                  await handleUpload(file, parentFolder);
                  close();
                }}
              >
                {" "}
                Yes{" "}
              </button>
              <button className="btn-primary" onClick={close}>
                {" "}
                No{" "}
              </button>
            </div>
          </Popup>
        </div>
      )}
    </Popup>
  );
};

const CreateFolder = ({ trigger, handleCreateFolder }) => {
  let name;
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className="prompt-input">
          <div className="close-icon" onClick={close}>
            <AiFillCloseCircle />
          </div>
          <h2> Create a Folder </h2>
          <input
            type="text"
            placeholder="Enter folder name"
            onChange={(e) => {
              name = e.target.value;
              console.log(name);
            }}
          />
          <Popup
            trigger={<button className="btn-primary"> Create </button>}
            modal
            position="bottom right"
          >
            <div className="prompt confirm-popup">
              <h2> Are you sure you want to create this folder? </h2>
              <button
                className="btn-primary"
                onClick={async () => {
                  await handleCreateFolder(name);
                  close();
                }}
              >
                {" "}
                Yes{" "}
              </button>
              <button className="btn-primary" onClick={close}>
                {" "}
                No{" "}
              </button>
            </div>
          </Popup>
        </div>
      )}
    </Popup>
  );
};

export {
  TestModal,
  AddFolder,
  AddFile,
  DeleteFolder,
  DeleteFile,
  RenameFolder,
  RenameFile,
  ShowInfo,
  Donwload,
  Upload,
  CreateFolder,
};
