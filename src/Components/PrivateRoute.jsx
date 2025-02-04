import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Context/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signIn" />;
};

export default PrivateRoute;
