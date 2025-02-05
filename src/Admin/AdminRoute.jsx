import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAdmin from "../CUstomHooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default AdminRoute;
