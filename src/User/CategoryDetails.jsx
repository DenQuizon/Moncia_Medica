import React, { useContext, useState } from "react";
import UseAxiosPublic from "../CUstomHooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";
import UseCart from "./Cart/UseCart";
import UseSecureAxios from "../CUstomHooks/UseSecureAxios";
import { Helmet } from "react-helmet";

const CategoryDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [carts, refetch] = UseCart();
  const axiosSecure = UseSecureAxios();
  const { category } = useParams();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  console.log(category);
  const axiosPublic = UseAxiosPublic();

  const { data: medicines = [] } = useQuery({
    queryKey: ["medicine"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/get/category?category=${category}`);
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

  return (
    <div className="p-6">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Categorydetails</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8">
        {category} Medicines
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {" "}
        {/* Grid Layout */}
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
                ${medicine.price}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md mt-4 transition duration-300"
                onClick={() => handleAddToCart(medicine)}
              >
                Select
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
              <strong>Price:</strong> ${selectedMedicine.price}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
