import "./App.css";

import LoginPage from "./pages/login/login";
import SignupPage from "./pages/signup/SignUp.jsx";
import Profile from "./pages/profile/Profile";
import Sidebar from "./components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import GoogleAuth from "./pages/googleAuth";
import UserDocumentsPage from "./pages/documnets/userdocuments";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/:type" element={<Sidebar />} />
        <Route path="/google/:token" element={<GoogleAuth />} />
      </Routes>
    </div>
  );
}

export default App;
