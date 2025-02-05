import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider/AuthProvider";

const User = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full p-6 bg-white rounded-2xl shadow-md">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-teal-500 object-cover"
          />

          {/* User Name */}
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {user?.displayName || "Anonymous User"}
          </h2>

          {/* User Email */}
          <p className="mt-2 text-gray-600 text-sm">
            {user?.email || "Email not provided"}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg shadow hover:bg-teal-600">
              Edit Profile
            </button>
            <button className="px-4 py-2 text-sm font-medium text-teal-500 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
