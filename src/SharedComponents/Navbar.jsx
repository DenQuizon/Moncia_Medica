import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "../../src/index.css";
import { AuthContext } from "../AuthProvider/AuthProvider";
import UseCart from "../User/Cart/UseCart";
import useAdmin from "../CUstomHooks/useAdmin";
import useSeller from "../CUstomHooks/useSeller";

const Navbar = () => {
  const [carts, refetch] = UseCart();
  const { user, logout } = useContext(AuthContext);

  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const menuLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/shop"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Shop
        </NavLink>
      </li>
      {user ? (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
      ) : (
        ""
      )}

      {!user ? (
        <li>
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Login
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink
            to="/profile"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Profile
          </NavLink>
        </li>
      )}
      {user ? (
        <li>
          <NavLink
            to="/cart"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <span className="relative">
              Cart {carts.length}
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1"></span>
            </span>
          </NavLink>
        </li>
      ) : (
        ""
      )}
    </>
  );

  return (
    <div
      className={`fixed w-full z-30 ${
        theme === "light" ? "bg-[#a7dada]" : "bg-[#282c34]"
      } transition-colors duration-300`}
    >
      <div className="navbar bg-transparent backdrop-blur-lg w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn p-0 btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 space-x-4 shadow nav-links"
            >
              {menuLinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">MediShop</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 nav-links">
            {menuLinks} {/* No need for extra fragment here */}
          </ul>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          <div className="dropdown hidden md:block">
            <button className="btn btn-sm">
              {language} <span className="ml-1">&#9660;</span>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100 shadow-md rounded-box w-40 mt-2"
            >
              <li>
                <button onClick={() => handleLanguageChange("English")}>
                  English
                </button>
              </li>
              <li>
                <button onClick={() => handleLanguageChange("Spanish")}>
                  Spanish
                </button>
              </li>
              <li>
                <button onClick={() => handleLanguageChange("French")}>
                  French
                </button>
              </li>
            </ul>
          </div>

          <button
            onClick={toggleTheme}
            className={`btn btn-sm ${
              theme === "light"
                ? "bg-black text-white border-white hover:bg-gray-700"
                : "bg-white text-black border-gray-700 hover:bg-gray-300"
            } transition-colors duration-300 hidden md:block`}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          {!user ? (
            <NavLink to="/signup" className="btn btn-primary btn-sm">
              Join Us
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="User Avatar" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to="/profile">Update Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
