import React from "react";
import { useParams } from "react-router-dom";

//pages
import HomePage from "./home/homepage";
import Documents from "./documnets/documents";
import UserDocumentsPage from "./documnets/userdocuments";
import DocumentsPage from "./documnets/userFolders";
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
    </div>
  );
};

export default Master;
