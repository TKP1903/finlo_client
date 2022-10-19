import React from "react";
import "./signup.css";
import axios from "axios";
import finloLogo from "../../assets/finlo_logo.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "../../key";
 const SignupPage = () => {
  const [inputs, setInputs] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    State: "",
    ZipCode: "",
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
  const [firstnameError, setFirstnameError] = useState({
    status: false,
    msg: "",
  });
  const [lastnameError, setLastnameError] = useState({
    status: false,
    msg: "",
  });
  const [mobileNoError, setMobileNoError] = useState({
    status: false,
    msg: "",
  });
  const [stateError, setStateError] = useState({
    status: false,
    msg: "",
  });
  const [zipCodeError, setZipCodeError] = useState({
    status: false,
    msg: "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    status: false,
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
      console.log(inputs);
      if (inputs.FirstName.length === 0) {
        console.log("FirstName");
        setFirstnameError({
          name: "Please enter your firstname",
          status: true,
        });
      }
      console.log(firstnameError.name)
      if (inputs.LastName.length === 0) {
        console.log("lastname");
        setLastnameError({
          name: "Please enter your lastname",
          status: true,
        });
      }
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
      if (inputs.confirmPassword.length === 0) {
        setConfirmPasswordError({
          name: "Please confirm your password",
          state: true,
        });
      } else {
        if (inputs.password !== inputs.confirmPassword) {
          setConfirmPasswordError({
            name: "Password not matched",
            state: true,
          });
        }
      }
      if (inputs.mobileNo.length === 0) {
        console.log("mobile No");
        setMobileNoError({
          name: "Please enter your mobileNo",
          state: true,
        });
      }

      if (inputs.State.length === 0) {
        setStateError({
          name: "Please enter your state",
          state: true,
        });
      }
      if (inputs.ZipCode.length === 0) {
        setZipCodeError({
          name: "Please enter your ZipCode",
          state: true,
        });
      } else if (inputs.ZipCode.length < 6) {
        setZipCodeError({
          name: "Please enter valid ZipCode",
          state: true,
        });
      }
      if (emailError.state === false && passwordError.state === false) {
        const result = await axios.post(`${API_URL}auth/login`, inputs);
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
    // const googleAuth = await axios.get(`${API_URL}auth/google"`;
    window.location.href = `${API_URL}auth/google`;
    // window.location.href = `${API_URL}auth/google`;
    console.log(googleAuth);
  };
  return (
    <div>
      <div className="signup_container align_column">
        <div className="signup_block align_column">
          {error.state ? <div className="errormsg">{error.name}</div> : <></>}
          <div className="logo">
            <img src={finloLogo} alt="" />
          </div>
          <div className="signup_info">
            <h2 className="welcome">Welcome!</h2>
            <p className="SignUptext">Sign Up</p>
          </div>
          <form action="">
            <div className="input_block">
              {firstnameError.state ? (
                <label htmlFor="FirstName" className="error_text">
                  {firstnameError.name}
                </label>
              ) : (
                <label>First Name</label>
              )}

              <input
                type="text"
                name="FirstName"
                placeholder="bob"
                onChange={handleChange}
              />
            </div>
            <div className="input_block">
              {firstnameError.state ? (
                <label htmlFor="LastName" className="error_text">
                  {lastnameError.name}
                </label>
              ) : (
                <label>Last Name</label>
              )}

              <input
                type="text"
                name="LastName"
                placeholder="bob"
                onChange={handleChange}
              />
            </div>
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
              {confirmPasswordError.state ? (
                <label htmlFor="confirmPassword" className="error_text">
                  {confirmPasswordError.name}
                </label>
              ) : (
                <label>Confirm Password</label>
              )}

              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
              />
            </div>
            <div className="input_block">
              {passwordError.state ? (
                <label htmlFor="mobileNo" className="error_text">
                  {mobileNoError.name}
                </label>
              ) : (
                <label>Mobile No</label>
              )}

              <input type="text" name="mobileNo" onChange={handleChange} />
            </div>
            <div className="input_block">
              {stateError.state ? (
                <label htmlFor="State" className="error_text">
                  {stateError.name}
                </label>
              ) : (
                <div className="StateLabel">
                  <label >State</label>
                  <div className="input_block StateInput">
                    <form>
                      <label>
                        <select
                          name="State"
                          className="StateInput"
                          onChange={handleChange}
                        >
                          <option value="">--Select State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">
                            Arunachal Pradesh
                          </option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Harayana">Harayana</option>
                          <option value="Himachal Pradesh">
                            Himachal Pradesh
                          </option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="MadhyaPradesh">MadhyaPradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Punjab">Tripura</option>
                          <option value="Uttarkhand">Uttarkhand</option>
                          <option value="Punjab">West Bengal</option>
                          <option value="Andaman and Nicobar Islands">
                            Andaman and Nicobar Islands
                          </option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Dadra and Nagar Haveli andDaman & Diu">
                            Dadra and Nagar Haveli and Daman & Diu
                          </option>
                          <option value="The Government of NCT of Delhi">
                            The Government of NCT of Delhi
                          </option>
                          <option value="Jammu & Kashmir">
                            Jammu & Kashmir
                          </option>
                          <option value="Ladakh">Ladakh</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Puducherry">Puducherry</option>
                        </select>
                      </label>
                    </form>
                  </div>
                </div>
              )}
            </div>
            <div className="input_block">
              {zipCodeError.state ? (
                <label htmlFor="ZipCode" className="error_text">
                  {zipCodeError.name}
                </label>
              ) : (
                <label>ZipCode</label>
              )}

              <input type="text" name="ZipCode" onChange={handleChange} />
            </div>

            <button className="signup_button" onClick={handleSubmit}>
              Sign Up
            </button>
          </form>

          <div className="google_login" onClick={googleAuth}>
            <FcGoogle className="google_icon" />
            Sign Up with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage


