import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import UseSecureAxios from "../../CUstomHooks/UseSecureAxios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UseAxiosPublic from "../../CUstomHooks/UseAxiosPublic";
import { Helmet } from "react-helmet";

const Invoice = () => {
  const { transaction_id } = useParams();
  const axiosSecure = UseSecureAxios();
  const { user } = useContext(AuthContext);
  const invoiceRef = useRef();

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  const { data: medicine = [], isLoading: loading } = useQuery({
    queryKey: ["medicine"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get/invoice?email=${user?.email}`);
      return res.data;
    },
  });

  // Find the specific invoice
  const filter = invoices.find((item) => item.transactionId === transaction_id);
  // const matchedMedicines = filter
  //   ? medicine.filter((item) => filter.menuIds.includes(item._id))
  //   : [];
  const matchedMedicines = filter
    ? medicine.filter((item) =>
        filter.menuIds.some(
          (menuId) => menuId.toString() === item._id.toString()
        )
      )
    : [];

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current, // Ensure this points to the correct ref
    documentTitle: "Invoice",
  });

  // Show loading or handle undefined filter
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!filter) {
    return <p>No matching invoice found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Invoice</title>
      </Helmet>
      <div
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6"
        ref={invoiceRef} // Ensure ref is attached here
      >
        {/* Website Logo */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-700">YourWebsite</h1>
          <p className="text-sm text-gray-500">
            Invoice ID: <span className="font-semibold">{filter._id}</span>
          </p>
        </div>

        {/* User Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Customer Information
          </h2>
          <p className="text-gray-600">Email: {filter.email}</p>
        </div>

        {/* Purchase Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Purchase Details
          </h2>
          <p className="text-gray-600">
            Transaction ID:{" "}
            <span className="font-semibold">{filter.transactionId}</span>
          </p>
          <p className="text-gray-600">
            Price:{" "}
            <span className="font-semibold">{`$${filter.price.toFixed(2)}`}</span>
          </p>
          <p className="text-gray-600">
            Date:{" "}
            <span className="font-semibold">
              {new Date(filter.date).toLocaleDateString()}
            </span>
          </p>
          <p className="text-gray-600">
            Status:{" "}
            <span className="font-semibold capitalize">{filter.status}</span>
          </p>
        </div>

        {/* Items Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Items Purchased
          </h2>
          {matchedMedicines.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600">
              {matchedMedicines.map((item) => (
                <li key={item._id} className="flex items-center gap-4 mb-2">
                  {/* Medicine Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-md shadow"
                  />
                  {/* Medicine Name */}
                  <span className="font-medium text-gray-700">
                    {item.itemName}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items found for this transaction.</p>
          )}
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 border-t pt-4">
          <p>Thank you for your purchase!</p>
          <p>YourWebsite © {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Print Button */}
      <div className="text-center mt-6">
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          Print / Download PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;
