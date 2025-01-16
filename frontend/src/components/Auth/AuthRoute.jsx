import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const user = useSelector((state) => state?.auth?.user);

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the child components
  return children;
};

export default AuthRoute;
