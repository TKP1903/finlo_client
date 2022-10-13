import logo from './logo.svg';
import './App.css';

import LoginPage from "./pages/login/login";
import Sidebar from "./components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import GoogleAuth from "./pages/googleAuth";

function App() {
  return (
    <div>
      {/* <LoginPage /> */}
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/google/:token" element={<GoogleAuth />} />
        <Route path="/:type" element={<Sidebar />} />
      </Routes>
    </div>
  );
}

export default App;
