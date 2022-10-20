import "./App.css";

import LoginPage from "./pages/login/login";
import SignupPage from "./pages/signup/SignUp.jsx";
import Sidebar from "./components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import GoogleAuth from "./pages/googleAuth";
import UserDocumentsPage from "./pages/documents/userdocuments";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />    
        <Route path="/" element={<LoginPage />} />
        <Route path="/:type" element={<Sidebar />} />
      </Routes>
    </div>
  );
}

export default App;
