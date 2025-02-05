import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { imgUpload } from "../utils";
import { useQuery } from "@tanstack/react-query";
import UseSecureAxios from "../CUstomHooks/UseSecureAxios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";

const Advertisement = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseSecureAxios();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item
  const { register, handleSubmit, reset } = useForm();

  // Fetch medicines
  const { data: users = [], refetch: refetchMedicines } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getmedicine?email=${user?.email}`);
      return res.data;
    },
  });

  // Fetch advertisements
  const { data: advertisements = [], refetch: refetchAdvertisements } =
    useQuery({
      queryKey: ["advertisements"],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/getadvertisement?email=${user?.email}`
        );
        return res.data;
      },
    });
  console.log(advertisements);

  const onSubmit = async (data) => {
    try {
      const imageUrl = data.image?.[0]
        ? await imgUpload(data.image[0])
        : selectedItem.image;

      const advertisementData = {
        ...data,
        image: imageUrl,
        medicineId: selectedItem?._id,
        sellerEmail: user?.email,
        description: data.description || selectedItem.description,
      };

      axiosSecure
        .post(`/advertisement/${selectedItem._id}`, advertisementData)
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Advertisement submitted successfully!",
            icon: "success",
          });

          reset();
          refetchMedicines();
          refetchAdvertisements();
          setShowModal(false);
        });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to upload advertisement. Please try again.",
        icon: "error",
      });
    }
  };

  const openModal = (medicine) => {
    setSelectedItem(medicine);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Advertisement</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-4">
        Manage Advertisements
      </h1>

      {/* Medicines Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((medicine, index) => (
              <tr key={medicine._id}>
                <th>{index + 1}</th>
                <td>{medicine.itemName}</td>
                <td>{medicine.category}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openModal(medicine)}
                  >
                    Add Advertisement
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg mb-4">Add Advertisement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Medicine Name */}
              <div className="form-control">
                <label className="label font-bold">Medicine Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  defaultValue={selectedItem.itemName}
                  {...register("medicineName")}
                  readOnly
                />
              </div>

              {/* Image Preview */}
              <div className="form-control">
                <label className="label font-bold">Current Image</label>
                <img
                  src={selectedItem.image}
                  alt="Selected Medicine"
                  className="w-32 h-32 object-cover mb-4"
                />
              </div>

              {/* Image Upload */}
              <div className="form-control">
                <label className="label font-bold">Upload New Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  {...register("image")}
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label font-bold">Description</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter a brief description"
                  defaultValue={selectedItem.description || ""}
                  {...register("description")}
                />
              </div>

              {/* Submit Button */}
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Advertisements Grid */}
      <h2 className="text-xl font-bold mt-8 mb-4">Advertisements</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {advertisements?.map((ad) => (
          <div
            key={ad._id}
            className="card shadow-lg p-4 border rounded-lg bg-gray-100"
          >
            <img
              src={ad.image}
              alt="Advertisement"
              className="w-full h-32 object-cover mb-2 rounded-lg"
            />
            <h3 className="text-lg font-semibold">{ad.description}</h3>
            <p className="text-sm text-gray-500">Status: {ad.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;
