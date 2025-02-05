import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./SharedComponents/Navbar";
import useAdmin from "./CUstomHooks/useAdmin";
import useSeller from "./CUstomHooks/useSeller";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  const navigate = useNavigate();

  // Redirect based on the user role
  useEffect(() => {
    if (isAdmin) {
      navigate("/dashboard/adminhome"); // Default page for admin
    } else if (isSeller) {
      navigate("/dashboard/homepage"); // Default page for seller
    } else {
      navigate("/dashboard/payment/history"); // Default page for user
    }
  }, [isAdmin, isSeller, navigate]);

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu when a link is clicked
  };

  return (
    <div>
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* Main Dashboard */}
      <div className="pt-[68px] min-h-[calc(100vh-300px)]">
        <div className="flex flex-col md:flex-row w-11/12 mx-auto">
          {/* Sidebar */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:block w-full md:w-[15%] bg-cyan-400 h-[300px] md:min-h-[calc(100vh-68px)] p-4`}
          >
            <ul className="space-y-2">
              {/* admin */}
              {isAdmin ? (
                <>
                  <li>
                    <NavLink
                      to={"/dashboard/manageuser"}
                      className="block py-2 px-4 text-white hover:bg-cyan-500 rounded"
                      onClick={handleLinkClick}
                    >
                      All User
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/managecategory"}
                      className="block py-2 px-4 text-white hover:bg-cyan-500 rounded"
                      onClick={handleLinkClick}
                    >
                      Category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/managepayment"}
                      className="block py-2 px-4 text-white hover:bg-cyan-500 rounded"
                      onClick={handleLinkClick}
                    >
                      Payments
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/salesreport"}
                      className="block py-2 px-4 text-white hover:bg-cyan-500 rounded"
                      onClick={handleLinkClick}
                    >
                      Sales Report
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/managebanner"}
                      className="block py-2 px-4 text-white hover:bg-cyan-500 rounded"
                      onClick={handleLinkClick}
                    >
                      Manage Banner
                    </NavLink>
                  </li>
                </>
              ) : isSeller ? (
                <>
                  <li>
                    <NavLink
                      to={"/dashboard/medicine"}
                      className="block py-2 px-4 text-white hover:bg-cyan-500 rounded"
                    >
                      Add Medicine
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/advertisement"}
                      className="block py-2 px-4 text-white hover:bg-cyan-500 rounded"
                    >
                      Advertisement
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/sellerpayment"}
                      className="block py-2 px-4 text-white hover:bg-cyan-500 rounded"
                    >
                      Payment History
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to={"/dashboard/payment/history"}
                      className="block py-2 px-4 text-white hover:bg-cyan-500 rounded"
                    >
                      Payment History
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden bg-cyan-500 text-white px-4 py-2 rounded mb-4"
          >
            {isMenuOpen ? "Close Menu" : "Open Menu"}
          </button>

          {/* Main Content */}
          <div className="w-full md:w-[85%]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
