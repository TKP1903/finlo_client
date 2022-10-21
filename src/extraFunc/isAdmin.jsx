// import react
import React from "react";
import {adminEmail} from "../key";

const isAdmin = () => {
    const email = localStorage.getItem("email");
    if (!email) {
        return undefined;
    };
    if (email !== adminEmail) {
        return false;
    };
    return true;
};

export default isAdmin;