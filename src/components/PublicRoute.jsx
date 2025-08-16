import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token"); // check if user is logged in

  if (token) {
    // if already logged in, redirect to home
    return <Navigate to="/" replace />;
  }

  return children; // render login page
}
