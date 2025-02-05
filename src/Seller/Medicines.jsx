import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import UseSecureAxios from "../CUstomHooks/UseSecureAxios";
import Swal from "sweetalert2";
import { imgUpload } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";

const AddMedicineForm = () => {
  const { user } = useContext(AuthContext);
  const sellerEmail = user?.email;
  console.log(sellerEmail);
  const axiosSecure = UseSecureAxios();
  const [showModal, setShowModal] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["medicine"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getmedicine?email=${sellerEmail}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const price = parseInt(data.price, 10); // or +data.price
    const discount = parseInt(data.discount, 10);
    const imageUrl = await imgUpload(data.image[0]);

    if (imageUrl) {
      const medicineData = {
        ...data,
        image: imageUrl,
        sellerEmail: sellerEmail,
        price: price,
        discount: discount, // Add the image URL to the form data
      };
      console.log(data);
      // Handle form submission (e.g., send data to API)
      axiosSecure.post("/addmedicine", medicineData).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `${medicineData.itemName} has been updated!`,
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
      reset(); // Reset the form after submission
      setShowModal(false); // Close the modal
    }
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Medicines</title>
      </Helmet>
      {/* Add Medicine Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
        >
          Add Medicine
        </button>
      </div>

      {/* table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="table w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Item Name</th>
              <th className="px-4 py-2 text-left">Generic Name</th>

              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Discount</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((medicine, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{medicine.itemName}</td>
                <td className="px-4 py-2">{medicine.genericName}</td>

                <td className="px-4 py-2">${medicine.price}</td>
                <td className="px-4 py-2">{medicine.discount}% OFF</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div
            className="bg-white w-full max-w-lg rounded-lg shadow-lg overflow-hidden"
            style={{
              height: "70vh", // Modal height set to 70% of viewport height
            }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b bg-gray-100">
                <h2 className="text-xl font-bold">Add Medicine</h2>
              </div>

              {/* Form Body */}
              <div className="p-4 overflow-y-auto flex-grow">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Item Name */}
                  <div>
                    <label className="block text-sm font-medium">
                      Item Name
                    </label>
                    <input
                      type="text"
                      {...register("itemName", {
                        required: "Item name is required",
                      })}
                      className="w-full p-2 border rounded"
                      placeholder="Enter item name"
                    />
                    {errors.itemName && (
                      <p className="text-red-500 text-sm">
                        {errors.itemName.message}
                      </p>
                    )}
                  </div>

                  {/* Item Generic Name */}
                  <div>
                    <label className="block text-sm font-medium">
                      Generic Name
                    </label>
                    <input
                      type="text"
                      {...register("genericName", {
                        required: "Generic name is required",
                      })}
                      className="w-full p-2 border rounded"
                      placeholder="Enter generic name"
                    />
                    {errors.genericName && (
                      <p className="text-red-500 text-sm">
                        {errors.genericName.message}
                      </p>
                    )}
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-sm font-medium">
                      Short Description
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                      })}
                      className="w-full p-2 border rounded"
                      placeholder="Enter a short description"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium">Image</label>
                    <input
                      type="file"
                      {...register("image", { required: "Image is required" })}
                      className="w-full p-2"
                    />
                    {errors.image && (
                      <p className="text-red-500 text-sm">
                        {errors.image.message}
                      </p>
                    )}
                  </div>

                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-sm font-medium">
                      Category
                    </label>
                    <select
                      {...register("category", {
                        required: "Category is required",
                      })}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select category</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Vitamin">Vitamin</option>
                      <option value="Injection">Injection</option>
                      <option value="Syrup">Syrup</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  {/* Company Dropdown */}
                  <div>
                    <label className="block text-sm font-medium">Company</label>
                    <select
                      {...register("company", {
                        required: "Company is required",
                      })}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select company</option>
                      <option value="Square">Square</option>
                      <option value="Beximco">Beximco</option>
                      <option value="Renata">Renata</option>
                      <option value="Incepta">Incepta</option>
                    </select>
                    {errors.company && (
                      <p className="text-red-500 text-sm">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  {/* Item Mass Unit */}
                  <div>
                    <label className="block text-sm font-medium">
                      Mass Unit
                    </label>
                    <select
                      {...register("massUnit", {
                        required: "Mass unit is required",
                      })}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select unit</option>
                      <option value="Mg">Mg</option>
                      <option value="ML">ML</option>
                    </select>
                    {errors.massUnit && (
                      <p className="text-red-500 text-sm">
                        {errors.massUnit.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Power</label>
                    <input
                      type="number"
                      {...register("power", { required: "Power is required" })}
                      className="w-full p-2 border rounded"
                      placeholder="Enter power"
                    />
                    {errors.power && (
                      <p className="text-red-500 text-sm">
                        {errors.power.message}
                      </p>
                    )}
                  </div>

                  {/* Per Unit Price */}
                  <div>
                    <label className="block text-sm font-medium">
                      Per Unit Price
                    </label>
                    <input
                      type="number"
                      {...register("price", { required: "Price is required" })}
                      className="w-full p-2 border rounded"
                      placeholder="Enter price"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  {/* Discount Percentage */}
                  <div>
                    <label className="block text-sm font-medium">
                      Discount Percentage
                    </label>
                    <input
                      type="number"
                      defaultValue={0}
                      {...register("discount")}
                      className="w-full p-2 border rounded"
                      placeholder="Enter discount percentage"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                  >
                    Submit
                  </button>
                </form>
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-100 border-t">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 underline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMedicineForm;
