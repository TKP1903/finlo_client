import React, { useState } from "react";
import UserDocumentsPage from "./userdocuments";
import UserFoldersPage from "./userFolders";

const Documents = () => {
  const [folders, setFolders] = useState({
    name: "",
    state: true,
  });
  const [files, setFiles] = useState({
    name: "",
    state: false,
  });
  function documentshandler(file, folder, fileName, folderName) {
    setFolders({
      name: folderName,
      state: folder,
    });
    setFiles({
      name: fileName,
      state: file,
    });
  }
  
  return (
    <div>
      {folders.state && <UserFoldersPage documentshandler={documentshandler} />}
      {files.state && (
        <UserDocumentsPage
          documentshandler={documentshandler}
          folders={folders}
        />
      )}
    </div>
  );
};

export default Documents;
