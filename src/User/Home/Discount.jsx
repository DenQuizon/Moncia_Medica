import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { axiosPublic } from "../../CUstomHooks/UseAxiosPublic";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import UseCart from "../Cart/UseCart";
import UseSecureAxios from "../../CUstomHooks/UseSecureAxios";

const Discount = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [carts, refetch] = UseCart();
  const axiosSecure = UseSecureAxios();
  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axiosPublic.get("/get/discount");
      return res.data;
    },
  });

  // Filter medicines with a discount greater than 0
  const discountedMedicines = medicines.filter(
    (medicine) => medicine.discount > 0
  );

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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">Loading discounts...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Special Discounts</h1>
      {discountedMedicines.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          showDots={true}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {discountedMedicines.map((medicine) => (
            <div key={medicine._id} className="p-2">
              <div className="card bg-white shadow-lg rounded-lg overflow-hidden relative">
                <div>
                  {/* Discount Badge */}
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                    {medicine.discount}% OFF
                  </div>

                  {/* Medicine Image */}
                  <img
                    src={medicine.image || "/placeholder-image.png"} // Fallback for missing image
                    alt={medicine.itemName || "Medicine"}
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Medicine Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {medicine.itemName || "Unknown Medicine"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {medicine.genericName || "No Generic Name"}
                  </p>
                  <p className="text-xl font-semibold text-green-600 mt-2">
                    ${medicine.price?.toFixed(2) || "N/A"}
                  </p>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(medicine)}
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">
            No discounts available right now.
          </p>
        </div>
      )}
    </div>
  );
};

export default Discount;
