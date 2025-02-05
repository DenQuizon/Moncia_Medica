import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseSecureAxios from "../CUstomHooks/UseSecureAxios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ManagePayment = () => {
  const axiosSecure = UseSecureAxios();

  // Fetch all payment data
  const {
    data: payments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/paymentsstatus");
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const handlePayment = (id) => {
    axiosSecure.patch(`/payment/accept/${id}`).then((res) => {
      refetch();
      Swal.fire({
        title: "Accepted!",
        text: "Advertisement has been accepted.",
        icon: "success",
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Payment</title>
      </Helmet>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Payment Information
        </h1>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
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
              <th className="border border-gray-300 px-4 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.transactionId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${payment.price.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 capitalize">
                  {payment.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.status === "pending" ? (
                    <button
                      onClick={() => {
                        handlePayment(payment._id);
                      }}
                      className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300"
                    >
                      Accept Payment
                    </button>
                  ) : (
                    <span className="text-green-600 font-bold">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayment;
