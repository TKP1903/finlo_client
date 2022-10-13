import React from "react";
import "./login.css";
import axios from "axios";
import finloLogo from "../../assets/finlo_logo.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const LoginPage = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:4000/auth/login",
        inputs
      );
      if (result.status === 200) {
        navigate("/dashboard2");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const googleAuth = async () => {
    // const googleAuth = await axios.get("http://localhost:4000/auth/google");
    window.location.href = "http://localhost:4000/auth/google";
    // window.location.href = "http://localhost:4000/auth/google";
    console.log(googleAuth);
  };
  return (
    <div>
      <div className="login_container align_column">
        <div className="logo">
          <img src={finloLogo} alt="" />
        </div>
        <div className="signin_info">
          <h2 className="welcome">Welcome!</h2>
          <p>Please sign in.</p>
        </div>
        <form action="">
          <div className="input_block">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="bob@gmail.com"
              onChange={handleChange}
            />
          </div>
          <div className="input_block">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <div className="input_block">
            <a href="/" className="forgotpassword">
              forgot password ?
            </a>
          </div>
          <button className="signin_button" onClick={handleSubmit}>
            Sign in
          </button>
        </form>
        <p className="alter_text">
          Don’t have account yet ?{" "}
          <a href="/dashboard" className="signup_link">
            Sign up
          </a>
        </p>
        <div className="google_login" onClick={googleAuth}>
          <FcGoogle className="google_icon" />
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
