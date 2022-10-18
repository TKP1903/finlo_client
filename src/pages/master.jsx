import React from "react";
import { useParams } from "react-router-dom";

//pages
import HomePage from "../pages/home/home.page";
import Docuents from "./documnets/documents";
import UserDocumentsPage from "./documnets/userdocuments";
import DocumentsPage from "./documnets/userFolders";
const Master = () => {
  const { type } = useParams();
  console.log({ type });
  return (
    <div>
      {type === "home" && <HomePage />}
      {/* {type === "documents" && <DocumentsPage />} */}
      {type === "documents" && <Docuents />}
    </div>
  );
};

export default Master;
