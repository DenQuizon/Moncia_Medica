import React, { useContext } from "react";
import UseSecureAxios from "../../CUstomHooks/UseSecureAxios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const UseCart = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseSecureAxios();
  const { data: carts = [], refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getCart?email=${user?.email}`);
      return res.data;
    },
  });
  return [carts, refetch];
};

export default UseCart;
