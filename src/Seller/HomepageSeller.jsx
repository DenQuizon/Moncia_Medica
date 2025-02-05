import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UseSecureAxios from "../CUstomHooks/UseSecureAxios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";

const HomepageSeller = () => {
  const { user } = useContext(AuthContext); // Get logged-in seller email
  const axiosSecure = UseSecureAxios();

  console.log("User context:", user);

  // Fetch revenue data
  const {
    data: revenue = { paid: 0, pending: 0 },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sellerRevenue", user?.email],
    queryFn: async () => {
      console.log("Calling API for email:", user?.email);
      const res = await axiosSecure.get(`/seller/revenue?email=${user?.email}`);
      console.log("API Response:", res.data);
      return res.data;
    },
    enabled: !!user?.email, // Only run query if email exists
  });

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error: {error.message || "Failed to fetch revenue"}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Homepage</title>
      </Helmet>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Seller Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Paid Total</h2>
            <p className="text-2xl font-bold">${revenue.paid}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Pending Total</h2>
            <p className="text-2xl font-bold">${revenue.pending}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageSeller;
