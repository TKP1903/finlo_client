import React from "react";
import { useParams } from "react-router-dom";

//pages
import HomePage from "./home/homepage";
import Documents from "./documents/documents";
import UserDocumentsPage from "./documents/userdocuments";
import DocumentsPage from "./documents/userFolders";
import Profile from "./profile/Profile";
import AdminPage from "./admin/admin";

const Master = () => {
  const { type } = useParams();
  console.log({ type });
  return (
    <div>
      {type === "home" && <HomePage />}
      {/* {type === "documents" && <DocumentsPage />} */}
      {type === "documents" && <Documents />}
      {type === "admin" && <AdminPage />}
      {type === "profile" && <Profile/>}
    </div>
  );
};

export default Master;
