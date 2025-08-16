import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // check if user is logged in

  if (!token) {
    return <Navigate to="/login" replace />; // redirect to login if not
  }

  return children; // render the protected component
}
