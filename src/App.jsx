import "./App.css";

import LoginPage from "./pages/login/login";
import SignupPage from "./pages/signup/SignUp.jsx";
import Sidebar from "./components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import GoogleAuth from "./pages/googleAuth";

import { useState } from "react";
import isAdmin from "./extraFunc/isAdmin";

function App() {
  const [mode, setMode] = useState(null);
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />    
        <Route path="/" element={<LoginPage setMode = {() => setMode(isAdmin() ? "admin" : "client")} />} />
        <Route 
          path="/:type" 
          element={<Sidebar 
            mode = { mode }
          />} 
        />
      </Routes>
    </div>
  );
}

export default App;
