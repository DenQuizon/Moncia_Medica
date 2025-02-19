import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-black">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-4">Oops! Page Not Found</p>
        <p className="text-lg mb-8">
          It seems like the page you're looking for doesn't exist.
        </p>
        <NavLink
          to="/"
          className="bg-sky-500 text-white px-6 py-3 rounded-full text-lg hover:bg-sky-600 transition duration-300"
        >
          Go Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
