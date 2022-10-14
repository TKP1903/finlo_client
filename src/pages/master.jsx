import React from "react";
import { useParams } from "react-router-dom";

//pages
import HomePage from "../pages/home/home.page";
import DocumentsPage from "../pages/documnets/documents";

const Master = () => {
  const { type } = useParams();
  return (
    <div>
      {type === "home" && <HomePage />}
      {type === "documents" && <DocumentsPage />}
        
    </div>
  );
};

export default Master;
