import React from "react";
import Login from "../pages/Login";
import { isTokenValid } from "../utils/isTokenValid"; // Utility to validate the token

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token"); // Replace with your token retrieval logic

  if (!token || !isTokenValid(token)) {
    console.log("This is executed !!");
    return <Login/>;
  }
  console.log("This is !!")

  return children;
};

export default ProtectedRoute;
