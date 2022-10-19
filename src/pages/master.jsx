import React from "react";
import { useParams } from "react-router-dom";

//pages
import HomePage from "./home/homepage";
import Documents from "./documnets/documents";
import UserDocumentsPage from "./documnets/userdocuments";
import DocumentsPage from "./documnets/userFolders";
<<<<<<< HEAD
import AdminPage from "./admin/admin";

=======
import Profile from "./profile/Profile";
>>>>>>> 84e474b5d94bbdd2d401eab91586b822393efac3
const Master = () => {
  const { type } = useParams();
  console.log({ type });
  return (
    <div>
      {type === "home" && <HomePage />}
      {/* {type === "documents" && <DocumentsPage />} */}
<<<<<<< HEAD
      {type === "documents" && <Documents />}
      {type === "admin" && <AdminPage />}
=======
      {type === "documents" && <Docuents />}
      {type === "profile" && <Profile/>}
>>>>>>> 84e474b5d94bbdd2d401eab91586b822393efac3
    </div>
  );
};

export default Master;
