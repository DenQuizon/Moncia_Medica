import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../CUstomHooks/UseAxiosPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import UseSecureAxios from "../../CUstomHooks/UseSecureAxios";
import UseCart from "../Cart/UseCart";
import { Helmet } from "react-helmet";

const Shop = () => {
  const axiosSecure = UseSecureAxios();
  const { user } = useContext(AuthContext);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();
  const [carts, refetch] = UseCart();

  // State for pagination, search, and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 10; // Items per page

  const { data, isLoading, isError } = useQuery({
    queryKey: ["medicine", currentPage, searchTerm, sortOrder],
    queryFn: async () => {
      const res = await axiosPublic.get(`/get/medicine`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          sort: sortOrder,
          search: searchTerm,
        },
      });
      return res.data;
    },
  });

  const handleAddToCart = (medicine) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const cartData = {
      medicineId: medicine._id,
      name: medicine.itemName,
      image: medicine.image,
      price: medicine.price,
      seller: medicine.sellerEmail,
      buyer: user?.email,
      quantity: 1,
    };
    axiosSecure.post("/addtocart", cartData).then(() => {
      refetch();
      Swal.fire({
        title: "Added to Cart",
        text: `${medicine.itemName} has been added to your cart.`,
        icon: "success",
      });
    });
  };

  if (isLoading) {
    return <p>Loading medicines...</p>;
  }

  if (isError) {
    return <p>Failed to load medicines. Please try again later.</p>;
  }

  const { medicines = [], totalItems, totalPages } = data || {};

  return (
    <div className="p-6">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Shop</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8">All Medicines</h1>

      {/* Search Bar and Sort Dropdown */}
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search medicines..."
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered text-black"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
        </select>
      </div>

      {/* Medicine Table */}
      {/* <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Company</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">
                  <img
                    src={medicine.image}
                    alt={medicine.itemName}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  {medicine.itemName}
                </td>
                <td className="border border-gray-300 p-2">
                  {medicine.company}
                </td>
                <td className="border border-gray-300 p-2">
                  {`$${medicine.price}`}
                </td>
                <td className="border border-gray-300 p-2 flex gap-2">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => setSelectedMedicine(medicine)}
                  >
                    Eye
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAddToCart(medicine)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {medicines.map((medicine) => (
          <div
            key={medicine._id}
            className="bg-white rounded-lg shadow-md p-4 border"
          >
            {" "}
            {/* Card Container */}
            <img
              src={medicine.image}
              alt={medicine.itemName}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <div>
              <h3
                className="text-lg font-semibold text-gray-800 line-clamp-1"
                title={medicine.itemName}
              >
                {medicine.itemName}
              </h3>
              <p
                className="text-sm text-gray-600 line-clamp-1"
                title={medicine.company}
              >
                {medicine.company}
              </p>
              <p
                className="text-sm text-gray-600 line-clamp-2"
                title={medicine.description}
              >
                {medicine.description}
              </p>
              <p className="text-md font-medium text-gray-800 mt-2">
                {`$${medicine.price}`}
              </p>
              <button
                className=" bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md mt-4 transition duration-300"
                onClick={() => handleAddToCart(medicine)}
              >
                Add to cart
              </button>

              {/* Eye button for modal */}
              <button
                className="mt-2 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300"
                onClick={() => setSelectedMedicine(medicine)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          className="btn btn-outline bg-white"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-bold">Page {currentPage}</span>
        <button
          className="btn btn-outline bg-white"
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Medicine Details Modal */}
      {selectedMedicine && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setSelectedMedicine(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">
              {selectedMedicine.itemName}
            </h2>
            <img
              src={selectedMedicine.image}
              alt={selectedMedicine.itemName}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <p>
              <strong>Generic Name:</strong> {selectedMedicine.genericName}
            </p>
            <p>
              <strong>Description:</strong> {selectedMedicine.description}
            </p>
            <p>
              <strong>Category:</strong> {selectedMedicine.category}
            </p>
            <p>
              <strong>Company:</strong> {selectedMedicine.company}
            </p>
            <p>
              <strong>Power:</strong> {selectedMedicine.power}{" "}
              {selectedMedicine.massUnit}
            </p>
            <p>
              <strong>Price:</strong> {`$${selectedMedicine.price}`}
            </p>
            {/* sdasdsd */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
