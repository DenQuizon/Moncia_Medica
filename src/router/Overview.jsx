import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { FaBoxes, FaTags, FaShoppingCart, FaPlusCircle } from "react-icons/fa";

const Overview = () => {
  // Dummy Data for Stats
  const stats = {
    totalProducts: 500,
    newProducts: 20,
    totalCategories: 15,
    clientPurchaseRate: [
      { month: "Jan", purchases: 120 },
      { month: "Feb", purchases: 180 },
      { month: "Mar", purchases: 90 },
      { month: "Apr", purchases: 220 },
      { month: "May", purchases: 150 },
      { month: "Jun", purchases: 300 },
    ],
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        📊 Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {/* Total Products */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center space-y-2">
          <FaBoxes className="text-4xl text-blue-500 mx-auto" />
          <h3 className="text-xl font-bold">{stats.totalProducts}</h3>
          <p className="text-gray-500">Total Products</p>
        </div>

        {/* New Products */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center space-y-2">
          <FaPlusCircle className="text-4xl text-green-500 mx-auto" />
          <h3 className="text-xl font-bold">{stats.newProducts}</h3>
          <p className="text-gray-500">Newly Added</p>
        </div>

        {/* Total Categories */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center space-y-2">
          <FaTags className="text-4xl text-purple-500 mx-auto" />
          <h3 className="text-xl font-bold">{stats.totalCategories}</h3>
          <p className="text-gray-500">Categories</p>
        </div>

        {/* Clients' Purchase Rate */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center space-y-2">
          <FaShoppingCart className="text-4xl text-red-500 mx-auto" />
          <h3 className="text-xl font-bold">📈</h3>
          <p className="text-gray-500">Purchase Rate</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart - Purchases Per Month */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">🛒 Purchases Per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.clientPurchaseRate}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="purchases" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Monthly Sales Trend */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">📉 Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.clientPurchaseRate}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="purchases" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
