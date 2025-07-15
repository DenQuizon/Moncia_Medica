import React from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UseCart from "./UseCart"; // Custom hook for fetching cart data
import { axiosPublic } from "../../CUstomHooks/UseAxiosPublic";
import { Helmet } from "react-helmet";

const Cart = () => {
  const [carts, setCarts, refetch] = UseCart();

  // Calculate total price
  const totalPrice = carts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Update quantity in the backend
  const updateQuantity = async (id, increment) => {
    try {
      // Send only the increment action to the backend
      await axiosPublic.patch(`/cart/update/${id}`, { increment });

      // Optionally refetch the cart items after update
      const { data } = await axiosPublic.get("/getcart");
      setCarts(data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const decreaseQuantity = async (id, increment) => {
    try {
      // Send only the increment action to the backend
      await axiosPublic.patch(`/cart/decrease/${id}`, { increment });

      // Optionally refetch the cart items after update
      const { data } = await axiosPublic.get("/getcart");
      setCarts(data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remove a specific item

  const removeItem = async (id) => {
    try {
      // Use correct URL with dynamic ID
      await axiosPublic.delete(`/item/delete/${id}`).then((res) => {
        Swal.fire(
          "Removed",
          "The item has been removed from your cart.",
          "info"
        );
      });
      const { data } = await axiosPublic.get("/getcart");
      setCarts(data);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Clear all cart items
  const clearCart = async () => {
    try {
      const response = await axiosPublic.delete("/cart/clear");
      if (response.status === 200) {
        setCarts([]); // Clear cart state
        Swal.fire(
          "Cleared",
          "All items have been removed from your cart.",
          "success"
        );
      } else {
        throw new Error("Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      Swal.fire("Error", "Could not clear the cart. Try again later.", "error");
    }
  };

  return (
    <div className="p-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medistore||Cart</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {carts.length > 0 ? (
        <>
          {/* Cart Items */}
          <div className="space-y-4">
            {carts.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 shadow rounded"
              >
                {/* Left Section: Item Image and Info */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.seller}</p>
                    <p className="text-sm text-gray-600">
                      Price: {`$${item.price.toFixed(2)}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Right Section: Quantity Controls and Actions */}
                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                  {/* Quantity Buttons */}
                  <button
                    onClick={() => updateQuantity(item._id)}
                    className="px-3 py-1 bg-green-500 text-white cursor-pointer rounded hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="px-3 py-1 bg-red-500 text-white cursor-pointer rounded hover:bg-red-600"
                  >
                    -
                  </button>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item._id)}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-6 p-4 bg-gray-100 shadow rounded">
            <h2 className="text-xl font-semibold text-center md:text-left">
              Cart Summary
            </h2>
            <p className="text-lg mt-2 text-center md:text-left">
              Total: {`$${totalPrice.toFixed(2)}`}
            </p>
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full md:w-auto"
              >
                Clear Cart
              </button>
              <NavLink
                to="/checkout"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full md:w-auto text-center"
              >
                Checkout
              </NavLink>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-lg text-gray-600">Your cart is empty!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
