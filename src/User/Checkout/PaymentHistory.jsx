import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import UseSecureAxios from "../../CUstomHooks/UseSecureAxios";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const PaymentHistory = () => {
  const axiosSecure = UseSecureAxios();
  const { user } = useContext(AuthContext);

  // Fetch payment history for the logged-in user
  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  // Handle loading state
  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  // Handle error state
  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error: {error.message || "Failed to load payment history"}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Payment History
        </h1>

        {payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-sm lg:text-base">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Transaction ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Amount Paid
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Payment Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.transactionId}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {payment.transactionId || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${payment.price?.toFixed(2) || "0.00"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(payment.date).toLocaleDateString() || "N/A"}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 capitalize ${
                        payment.status === "paid"
                          ? "text-green-600 font-medium"
                          : "text-yellow-600 font-medium"
                      }`}
                    >
                      {payment.status || "Pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No payment history found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
