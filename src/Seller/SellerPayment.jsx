import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UseSecureAxios from "../CUstomHooks/UseSecureAxios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import UseAxiosPublic from "../CUstomHooks/UseAxiosPublic";
import { Helmet } from "react-helmet";

const SellerPayment = () => {
  const { user } = useContext(AuthContext); // Get logged-in seller email
  const axiosSecure = UseSecureAxios();
  const axiosPublic = UseAxiosPublic();

  // Fetch payments for the seller
  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sellerPayments", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/seller/dashboard?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Payment</title>
      </Helmet>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Seller Dashboard
        </h1>

        {payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-sm lg:text-base">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Medicine
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Transaction ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Price
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    {/* Medicine Details */}
                    <td className="border border-gray-300 px-4 py-2">
                      {payment.medicine ? (
                        <div className="flex items-center gap-2">
                          <img
                            src={payment.medicine.image || "/default-image.jpg"}
                            alt={payment.medicine.itemName || "No Image"}
                            className="w-12 h-12 rounded-md shadow"
                          />
                          <div>
                            <p className="font-medium text-gray-700">
                              {payment.medicine.itemName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {payment.medicine.genericName}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p>No medicine found for this payment.</p>
                      )}
                    </td>

                    {/* Transaction Details */}
                    <td className="border border-gray-300 px-4 py-2">
                      {payment.transactionId}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {`$${payment.price}`}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 capitalize">
                      {payment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default SellerPayment;
