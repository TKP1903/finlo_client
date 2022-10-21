import React, { useState } from "react";
// import UserDocumentsPage from "./userdocuments";
import UserFoldersPage from "./userFolders";

const Documents = ({mode}) => {
  // const [folders, setFolders] = useState({
  //   name: "",
  //   state: true,
  // });
  // const [files, setFiles] = useState({
  //   name: "",
  //   state: false,
  // });
  // function documentshandler(file, folder, fileName, folderName) {
  //   setFolders({
  //     name: folderName,
  //     state: folder,
  //   });
  //   setFiles({
  //     name: fileName,
  //     state: file,
  //   });
  // };
  return (
    <div>
      <UserFoldersPage mode={mode} />
    </div>
  );
};

export default Documents;
