import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import UseSecureAxios from "./UseSecureAxios";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseSecureAxios();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      console.log(res.data);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
