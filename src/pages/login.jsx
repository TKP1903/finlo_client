import React from 'react'
import './login.css';
import  finloLogo  from '../assets/finlo_logo.png';
import { FcGoogle } from 'react-icons/fc';
import { Link } from "react-router-dom";
const LoginPage = () => {
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
            <input type="email" placeholder="bob@gmail.com" />
          </div>
          <div className="input_block">
            <label>Password</label>
            <input type="password" />
          </div>
          <div className="input_block">
            <a href="/" className="forgotpassword">
              forgot password ?
            </a>
          </div>
          <Link to="/dashboard">
            <button className="signin_button">Sign in</button>
          </Link>
        </form>
        <p className="alter_text">
          Don’t have account yet ?{" "}
          <a href="/dashboard" className="signup_link">
            Sign in
          </a>
        </p>
        <div className="google_login">
          <FcGoogle className="google_icon" />
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default LoginPage