import React from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
