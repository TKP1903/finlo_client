import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const GoogleAuth = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("FinloUser", JSON.stringify({ token }));
    navigate("/dashboard");
  }, [token]);
  return <div>Loading Please Wait .....</div>;
};

export default GoogleAuth;
