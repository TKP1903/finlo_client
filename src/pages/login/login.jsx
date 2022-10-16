import React from "react";
import "./login.css";
import axios from "axios";
import finloLogo from "../../assets/finlo_logo.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState({
    state: false,
    msg: "",
  });
  const [error, setError] = useState({
    state: false,
    msg: "",
  });
  const [passwordError, setPasswordError] = useState({
    state: false,
    msg: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (inputs.email.length === 0) {
        setEmailError({
          name: "Please enter your email",
          state: true,
        });
      } else if (!isValidEmail(inputs.email)) {
        setEmailError({
          name: "Invalid Email",
          state: true,
        });
      } else {
        setEmailError({
          name: "",
          state: false,
        });
      }
      if (inputs.password.length === 0) {
        setPasswordError({
          name: "Please enter your password",
          state: true,
        });
      } else {
        setPasswordError({
          name: "",
          state: false,
        });
      }
      if (emailError.state === false && passwordError.state === false) {
        const result = await axios.post(
          "http://localhost:4000/auth/login",
          inputs
        );
        if (result.status === 200) {
          navigate("/home");
        }
      }
    } catch (error) {
      console.log(error.response.data);
      setError({
        name: error.response.data,
        state: true,
      });
    }
  };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function fetchData() {
      console.log("start");

      await sleep(10000);
      setError({
        name: "",
        state: false,
      });

      console.log("end");
    }

    fetchData();
  }, [error.state]);
  const googleAuth = async () => {
    // const googleAuth = await axios.get("http://localhost:4000/auth/google");
    window.location.href = "http://localhost:4000/auth/google";
    // window.location.href = "http://localhost:4000/auth/google";
    console.log(googleAuth);
  };
  return (
    <div>
      <div className="login_container align_column">
        <div className="login_block align_column">
          {error.state ? <div className="errormsg">{error.name}</div> : <></>}
          <div className="logo">
            <img src={finloLogo} alt="" />
          </div>
          <div className="signin_info">
            <h2 className="welcome">Welcome!</h2>
            <p>Please sign in.</p>
          </div>
          <form action="">
            <div className="input_block">
              {emailError.state ? (
                <label htmlFor="email" className="error_text">
                  {emailError.name}
                </label>
              ) : (
                <label>Email Address</label>
              )}

              <input
                type="email"
                name="email"
                placeholder="bob@gmail.com"
                onChange={handleChange}
              />
            </div>
            <div className="input_block">
              {passwordError.state ? (
                <label htmlFor="password" className="error_text">
                  {passwordError.name}
                </label>
              ) : (
                <label>Password</label>
              )}

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
            <a href="" className="signup_link">
              Sign up
            </a>
          </p>
          <div className="google_login" onClick={googleAuth}>
            <FcGoogle className="google_icon" />
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
