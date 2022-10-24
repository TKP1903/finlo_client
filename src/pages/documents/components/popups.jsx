import React from "react";
import Popup from "reactjs-popup";

import { AiFillCloseCircle } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import("reactjs-popup/dist/index.css");
import "./css/popups.css";
import debounce from "../../../jsFunctions/debounce";
import hasWord from "../../../jsFunctions/hasWord";

const notifSuccess = (
  message,
  config = {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "light",
  }
) => {
  setTimeout(() => {
    toast.success(message, config);
    toast.configure();
  }, 0);
};

const notifFail = (
  message,
  config = {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "light",
  }
) => {
  setTimeout(() => {
    toast.error(message, config);
    toast.configure();
  }, 0);
};

const ConfirmAction = ({
  trigger,
  close = null,
  onYes,
  onNo = null,
  message = "Are you sure?",
}) => {
  return (
    <Popup trigger={trigger} modal nested position="bottom right">
      {(close2) => {
        return (
          <div className="prompt confirm-popup">
            <div className="close-icon" onClick={close2}>
              <AiFillCloseCircle />
            </div>
            <h2> {message} </h2>
            <div className="btn-group">
              <button className="btn-primary" onClick={onYes}>
                {" "}
                Yes{" "}
              </button>
              <button className="btn-primary" onClick={onNo || close2}>
                {" "}
                No{" "}
              </button>
            </div>
          </div>
        );
      }}
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
            onChange={debounce((e) => {
              newName = e.target.value;
            }, 100)}
          />
          <ConfirmAction
            trigger={<button className="btn-primary"> Add </button>}
            message="Are you sure?"
            onYes={async () => {
              const { res, isSuccess } = await handleAddFolder(
                newName,
                parentFolder
              );
              if (isSuccess) {
                notifSuccess("Folder Created Sucessfully!");
              } else {
                if (hasWord(res.data, "Duplicate")) {
                  notifFail(
                    "Folder name is already taken\n Please try a new name"
                  );
                } else {
                  notifFail("Cannot Create folder");
                }
                console.log(res);
              }
              close();
            }}
            onNo={close}
            close={close}
          />
        </div>
      )}
    </Popup>
  );
};

const DeleteFolder = ({ trigger, handleDeleteFolder }) => {
  return (
    <ConfirmAction
      trigger={trigger}
      onYes={async () => {
        const isSuccess = !!(await handleDeleteFolder());
        notifSuccess("Folder Deleted Sucessfully!");
        // if (isSuccess) {
        //   notifSuccess("Folder Deleted Sucessfully!");
        // } else {
        //   notifFail("Cannot Delete folder, Check you internet!");
        // }
      }}
    />
  );
  // return (
  //   <Popup trigger={trigger} modal nested>
  //     {(close) => (
  //       <div className="prompt confirm-popup">
  //         <div className="close-icon" onClick={close}>
  //           <AiFillCloseCircle />
  //         </div>
  //         <h2> Are you sure you want to delete this folder? </h2>
  //         <button
  //           className="btn-primary"
  //           onClick={() => {
  //             Deletefoldernotify();
  //             handleDeleteFolder();
  //           }}
  //         >
  //           {" "}
  //           Yes{" "}
  //         </button>
  //         <button className="btn-primary" onClick={close}>
  //           {" "}
  //           No{" "}
  //         </button>
  //         <ToastContainer />
  //       </div>
  //     )}
  //   </Popup>
  // );
};

const DeleteFile = ({ trigger, handleDeleteFile }) => {
  return (
    <ConfirmAction
      trigger={trigger}
      onYes={async () => {
        const isSuccess = !!(await handleDeleteFile());
        if (isSuccess) {
          notifSuccess("File Deleted Sucessfully!");
        } else {
          notifFail("Cannot Delete File, Check you internet!");
        }
      }}
    />
  );

  // return (
  //   <Popup trigger={trigger} modal nested>
  //     {(close) => (
  //       <div className="prompt confirm-popup">
  //         <div className="close-icon" onClick={close}>
  //           <AiFillCloseCircle />
  //         </div>
  //         <h2> Are you sure you want to delete this file? </h2>
  //         <button
  //           className="btn-primary"
  //           onClick={() => {
  //             Deletefiles();
  //             Deletefilenotify();
  //           }}
  //         >
  //           {" "}
  //           Yes{" "}
  //         </button>
  //         <button className="btn-primary" onClick={close}>
  //           {" "}
  //           No{" "}
  //         </button>
  //         <ToastContainer />
  //       </div>
  //     )}
  //   </Popup>
  // );
};

const RenameFolder = ({ trigger, handleRenameFolder }) => {
  const Renamenotify = () => {
    toast.success("Folder Name Changed Successfully!");
  };

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
            onChange={debounce((e) => {
              newName = e.target.value;
            })}
          />
          <ConfirmAction
            trigger={<button className="btn-primary"> Rename </button>}
            message="Are you sure?"
            onYes={async () => {
              const { res, isSuccess } = await handleRenameFolder(newName);
              if (isSuccess) {
                notifSuccess("Folder Renamed Sucessfully!");
              } else {
                if (hasWord(res.data, "Duplicate")) {
                  notifFail(
                    "Folder name is already taken\n Please try a new name"
                  );
                } else {
                  notifFail("Cannot Rename folder");
                }
                console.log(res);
              }
              close();
            }}
            onNo={close}
          />
          {/*           
          <Popup
            trigger={<button className="btn-primary"> Rename </button>}
            modal
            position="bottom right"
          >
            <div className="prompt confirm-popup">
              <div className="close-icon" onClick={close}>
                <AiFillCloseCircle />
              </div>
              <h2> Are you sure you want to rename this folder? </h2>
              <ToastContainer />
              <button
                className="btn-primary"
                onClick={async () => {
                  const isSuccess = !!(await handleRenameFolder(newName));
                  if (isSuccess) {
                    notifSuccess("Folder created sucessfully");
                  } else {
                    notifFail("Cannot use this name for the folder");
                  }
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
          </Popup> */}
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
          <ConfirmAction
            trigger={<button className="btn-primary"> Rename </button>}
            onYes={async () => {
              const { res, isSuccess } = await handleRenameFile(newName);
              if (isSuccess) {
                notifSuccess("File Renamed Sucessfully!");
              } else {
                if (hasWord(res.data, "Duplicate")) {
                  notifFail(
                    "File name is already taken\n Please try a new name"
                  );
                } else {
                  notifFail("Cannot Rename File");
                }
                console.log(res);
              }
              close();
            }}
            onNo={close}
          />
          {/* <Popup
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
          </Popup> */}
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
                <span className="info-item-value">
                  {" "}
                  {Math.round(info.size / 1021)} Kb{" "}
                </span>
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

const Donwload = ({ trigger, handleDownload, file }) => {
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className="prompt confirm-popup">
          <div className="close-icon" onClick={close}>
            <AiFillCloseCircle />
          </div>
          <h2> Are you sure you want to download {file.name || "this file"}? </h2>
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

const FilePreview = ({ trigger, file }) => {
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className="prompt">
          <div className="close-icon" onClick={close}>
            <AiFillCloseCircle />
          </div>
          <h2> Preview </h2>
          <div className="preview">
            <img src={file.url} alt="preview" />
          </div>
        </div>
      )}
    </Popup>
  );
};

const fileValidation = (file) => {
  /**
   * File size limit:15MB
   * Allowed file types :-
   * Images
   * .jpg
   * .jpeg
   * .png
   * .gif – must be inserted as Full Size image for animated gif to play.
   *
   *  Documents
   * .pdf
   * .doc, .docx
   * .ppt, .pptx
   * .xls, .xlsx
   * .txt
   * .rtf
   * .csv
   *
   * Compressed
   * .zip
   * .rar
   * .7z
   *
   * Audio
   * .mp3
   * .m4a
   * .wav
   *
   * Video
   * .mp4, .m4v
   * .mpg
   * .wmv
   * .mov
   * .avi
   * .swf
   *
   * Other
   * .ins, .isf, .te, .xbk, .ist, .kmz, .kes, .flp, .wxr, .xml, .fjsw, .zip, .epub
   */

  // set of allowed types
  const allowedTypes = new Set([
    // images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    // documents
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    // compressed
    "application/zip",
    "application/x-rar-compressed",
    "application/x-7z-compressed",

    // audio
    "audio/mpeg",
    "audio/mp4",
    "audio/wav",
    // video
    "video/mp4",
    "video/mpeg",
    "video/x-ms-wmv",
    "video/quicktime",
    "video/x-msvideo",
    // other
    "application/x-shockwave-flash",
    "application/ins",
    "application/isf",
    "application/te",
    "application/xbk",
    "application/ist",
    "application/kmz",
    "application/kes",
    "application/flp",
    "application/wxr",
    "application/xml",
    "application/fjsw",
    "application/zip",
    "application/epub",
  ]);

  if (!allowedTypes.has(file.type)) {
    return {
      isValid: false,
      message: "File type not supported",
    };
  }
  if (file.size > 15 * 1024 * 1024) {
    return {
      isValid: false,
      message: "File size too large try a file less than 15 MB",
    };
  }
  return {
    isValid: true,
    message: "File is valid",
  };
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
              const { isValid, message } = fileValidation(file);
              if (!isValid) {
                setTimeout(() => {
                  notifFail(
                    message +
                      ".\n" +
                      `${file.type || "This"} is not a supported type`
                  );
                }, 0);
                close();
              }
            }}
          />
          <ConfirmAction
            trigger={<button className="btn-primary"> Upload </button>}
            onYes={async () => {
              const isSuccess = await handleUpload(file, parentFolder);
              if (!isSuccess) {
                notifFail("File already exists");
              } else {
                notifSuccess("File uploaded successfully");
              }
              close();
            }}
            onNo={close}
            message="Are you sure you want to upload this file?"
          />
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
            }}
          />
          <ConfirmAction
            trigger={<button className="btn-primary"> Create </button>}
            onYes={async () => {
              const isSuccess = await handleCreateFolder(name);
              if (!isSuccess) {
                notifFail("Folder already exists");
              } else {
                notifSuccess("Folder created successfully");
              }
              close();
            }}
            onNo={close}
            message="Are you sure?"
          />

          {/* <Popup
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
          </Popup> */}
        </div>
      )}
    </Popup>
  );
};

export {
  TestModal,
  AddFolder,
  DeleteFolder,
  DeleteFile,
  RenameFolder,
  RenameFile,
  ShowInfo,
  Donwload,
  Upload,
  CreateFolder,
  FilePreview,
};
