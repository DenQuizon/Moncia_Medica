import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrash, FaUser, FaUserShield, FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";
import UseSecureAxios from "../CUstomHooks/UseSecureAxios";
import { Helmet } from "react-helmet";

const ManageUser = ({ currentUserId }) => {
  const axiosSecure = UseSecureAxios();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Role-based action handlers
  const makeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now an Admin!`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const makeSeller = (user) => {
    axiosSecure.patch(`/users/seller/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now a Seller!`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const makeUser = (user) => {
    axiosSecure.patch(`/users/user/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now a User!`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };
  const makeUserfromseller = (user) => {
    axiosSecure.patch(`/users/seller-user/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now a User!`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${userId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Users</title>
      </Helmet>
      {/* Centered Heading */}
      <h1 className="text-3xl font-bold text-center mb-8">Manage All Users</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border text-left">Serial</th>
              <th className="px-4 py-2 border text-left">Name</th>
              <th className="px-4 py-2 border text-left">Email</th>
              <th className="px-4 py-2 border text-left">Role</th>
              <th className="px-4 py-2 border text-left">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border text-center">
                  {user.role === "admin" ? (
                    <>
                      Admin
                      {user._id !== currentUserId && (
                        <button
                          onClick={() => makeSeller(user)}
                          className="text-orange-500 ml-2"
                        >
                          Downgrade to Seller
                        </button>
                      )}
                      {user._id !== currentUserId && (
                        <button
                          onClick={() => makeUser(user)}
                          className="text-red-500 ml-2"
                        >
                          Downgrade to User
                        </button>
                      )}
                    </>
                  ) : user.role === "seller" ? (
                    <>
                      Seller
                      <button
                        onClick={() => makeAdmin(user)}
                        className="text-blue-500 ml-2"
                      >
                        Promote to Admin
                      </button>
                      <button
                        onClick={() => makeUserfromseller(user)}
                        className="text-red-500 ml-2"
                      >
                        Downgrade to User
                      </button>
                    </>
                  ) : (
                    <>
                      User
                      <button
                        onClick={() => makeSeller(user)}
                        className="text-green-500 ml-2"
                      >
                        Promote to Seller
                      </button>
                    </>
                  )}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
