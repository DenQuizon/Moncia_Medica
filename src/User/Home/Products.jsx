import React from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { axiosPublic } from "../../CUstomHooks/UseAxiosPublic";

const Products = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getall");
      return response.data;
    },
  });

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-lg text-red-500">
        Error fetching products!
      </p>
    );

  return (
    <section className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">🩺 Our Medicines</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold">{product.itemName}</h3>
            <p className="text-sm text-gray-500">{product.genericName}</p>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 line-clamp-2">
              {product.description}
            </p>
            <p className="text-blue-500 font-bold mt-2">${product.price}</p>
            <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="text-center mt-8">
        <NavLink
          to="/shop"
          className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition"
        >
          See More
        </NavLink>
      </div>
    </section>
  );
};

export default Products;
