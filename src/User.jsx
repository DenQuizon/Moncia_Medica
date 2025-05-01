import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext); // Get user from context

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl text-center">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
        />
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {user?.displayName || "User Name"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
          <span className="mt-2 px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white rounded-full">
            {user?.role || "User"}
          </span>
        </div>
      </div>
    </div>
  );
};


export default Profile;
