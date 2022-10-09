import logo from './logo.svg';
import './App.css';

import LoginPage from './pages/login';
import Sidebar from "./components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <LoginPage /> */}
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Sidebar />} />
      </Routes>
    </div>
  );
}

export default App;
