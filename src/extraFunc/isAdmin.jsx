// import react
import React from "react";
import {adminEmail} from "../key";

const isAdmin = () => {
    if (localStorage.getItem("email") === adminEmail) {
        return true;
    }
    return false;
};

export default isAdmin;