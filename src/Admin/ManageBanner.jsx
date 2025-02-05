import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseSecureAxios from "../CUstomHooks/UseSecureAxios";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const ManageBanner = () => {
  const axiosSecure = UseSecureAxios();
  const { data: advertisements = [], refetch } = useQuery({
    queryKey: ["advertisement"],
    queryFn: async () => {
      const res = await axiosSecure.get("/getadvertisement");
      return res.data;
    },
  });

  // Handle Accept
  const handleAccept = (id) => {
    axiosSecure
      .patch(`/advertisement/accept/${id}`)
      .then((res) => {
        refetch();
        Swal.fire({
          title: "Accepted!",
          text: "Advertisement has been accepted.",
          icon: "success",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Failed to accept advertisement.",
          icon: "error",
        });
      });
  };

  // Handle Reject
  const handleReject = (id) => {
    axiosSecure
      .delete(`/advertisement/delete/${id}`)
      .then(() => {
        refetch();
        Swal.fire({
          title: "Rejected!",
          text: "Advertisement has been rejected.",
          icon: "success",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Failed to reject advertisement.",
          icon: "error",
        });
      });
  };

  return (
    <div className="p-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Banner</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-4">
        Manage Advertisements
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {advertisements?.map((ad) => (
          <div
            key={ad._id}
            className="card shadow-lg p-4 border rounded-lg bg-gray-100"
          >
            <img
              src={ad.image}
              alt="Advertisement"
              className="w-full h-32 object-cover mb-2 rounded-lg"
            />
            <h3 className="text-lg font-semibold">{ad.description}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Status:{" "}
              <span
                className={`font-bold ${
                  ad.status === "Pending"
                    ? "text-yellow-600"
                    : ad.status === "Accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {ad.status || "Pending"}
              </span>
            </p>
            <div className="flex justify-between">
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleAccept(ad._id)}
                disabled={ad.status !== "Pending"}
              >
                Accept
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleReject(ad._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBanner;
