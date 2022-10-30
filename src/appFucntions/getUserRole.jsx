// import react
import React from "react";

const getUserRole = () => {
    const user_role = localStorage.user_role || "client";
    return user_role;
}

export default getUserRole;
