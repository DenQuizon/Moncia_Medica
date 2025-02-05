import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useSeller from "../CUstomHooks/useSeller";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Loading";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller();
  const location = useLocation();

  if (loading || isSellerLoading) {
    return <Loading></Loading>;
  }
  if (user && isSeller) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default SellerRoute;
