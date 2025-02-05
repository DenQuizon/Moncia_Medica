import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { imgUpload } from "../utils";
import UseSecureAxios from "../CUstomHooks/UseSecureAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ManageCategory = () => {
  const axiosSecure = UseSecureAxios();
  const { data, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admincategory");
      return res.data;
    },
  });

  const {
    register: addRegister,
    handleSubmit: handleAddSubmit,
    reset: resetAddForm,
    formState: { errors: addErrors },
  } = useForm();

  const {
    register: updateRegister,
    handleSubmit: handleUpdateSubmit,
    setValue: setUpdateValue,
    reset: resetUpdateForm,
    formState: { errors: updateErrors },
  } = useForm();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Add Category Handler
  const handleAddCategory = async (data) => {
    try {
      const imageFile = data.image[0];
      const imageUrl = await imgUpload(imageFile);

      const newCategory = {
        category: data.name,
        image: imageUrl,
      };

      const response = await axiosSecure.post("/admincategory", newCategory);
      if (response.data.insertedId) {
        resetAddForm();
        refetch();
        Swal.fire({
          icon: "success",
          title: `${data.name} has been added!`,
          showConfirmButton: false,
          timer: 1000,
        });
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add category. Please try again.",
      });
    }
  };

  // Update Category Handler
  const handleUpdateCategory = async (data) => {
    try {
      const imageFile = data.image?.[0];
      let imageUrl = currentCategory.image;

      if (imageFile) {
        imageUrl = await imgUpload(imageFile);
      }

      const updatedCategory = {
        name: data.name,
        img: imageUrl, // Update the key to 'img' as per the backend
      };

      await axiosSecure.put(
        `/category/update/${currentCategory._id}`,
        updatedCategory
      ); // Fixed route template
      resetUpdateForm();
      refetch();
      Swal.fire({
        icon: "success",
        title: `${data.name} has been updated!`,
        showConfirmButton: false,
        timer: 1000,
      });
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating category:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update category. Please try again.",
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/category/delete/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Category has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const openUpdateModal = (category) => {
    setCurrentCategory(category);
    setUpdateValue("name", category.name);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Category</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8">Manage Categories</h1>

      {/* Add Category Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
        onClick={() => {
          resetAddForm();
          setIsAddModalOpen(true);
        }}
      >
        Add Category
      </button>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Category Name</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Update</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((category, index) => (
              <tr
                key={category._id}
                className={index % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{category.category}</td>
                <td className="px-4 py-2 border text-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openUpdateModal(category)}
                  >
                    Update
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleAddSubmit(handleAddCategory)}>
              {/* Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...addRegister("name", {
                    required: "Category name is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
                {addErrors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {addErrors.name.message}
                  </p>
                )}
              </div>

              {/* Image Field */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...addRegister("image", { required: "Image is required" })}
                  className="mt-1 block w-full text-sm"
                />
                {addErrors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {addErrors.image.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Add Category
              </button>
            </form>
            <button
              className="mt-4 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Update Category Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Update Category</h2>
            <form onSubmit={handleUpdateSubmit(handleUpdateCategory)}>
              {/* Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...updateRegister("name", {
                    required: "Category name is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
                {updateErrors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {updateErrors.name.message}
                  </p>
                )}
              </div>

              {/* Image Field */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...updateRegister("image")}
                  className="mt-1 block w-full text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Update Category
              </button>
            </form>
            <button
              className="mt-4 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
              onClick={() => setIsUpdateModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
