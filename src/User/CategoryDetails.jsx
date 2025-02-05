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
      <div className="overflow-x-auto">
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
                  ${medicine.price}
                </td>
                <td className="border border-gray-300 p-2 flex gap-2">
                  {/* Eye Button for Modal */}
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => setSelectedMedicine(medicine)}
                  >
                    Eye
                  </button>
                  {/* Select Button */}
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
