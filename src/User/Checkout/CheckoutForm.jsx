import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import UseCart from "../Cart/UseCart";
import axios from "axios";
import UseAxiosPublic from "../../CUstomHooks/UseAxiosPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [serror, setError] = useState();
  const [clientSecret, setClientSecret] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const [carts, refetch] = UseCart();
  const axiosPublic = UseAxiosPublic();
  const totalPrice = carts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (totalPrice <= 0) {
      return;
    }
    axiosPublic
      .post("/create-payment-intent", {
        price: totalPrice,
      })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosPublic, totalPrice]);

  const handleform = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confrimerror } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      });

    if (confrimerror) {
      console.log("error in confirm");
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const payment = {
          email: user.email,

          transactionId: paymentIntent.id,
          price: totalPrice,
          date: new Date(),
          cartIds: carts.map((item) => item._id),
          menuIds: carts.map((item) => item.medicineId),
          status: "pending",
        };
        const result = await axiosPublic.post("/payments", payment);
        console.log(result);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thanks for the payment",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/invoice/${paymentIntent.id}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Complete Your Payment
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Total Price:{" "}
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </p>
        <form onSubmit={handleform}>
          <div className="mb-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {serror && <p className="text-red-500 text-sm mb-4">{serror}</p>}
          <button
            disabled={!stripe || !clientSecret}
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300"
          >
            Pay Now
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-4">
          Secured by Stripe © 2025
        </p>
      </div>
    </div>
  );
};

export default CheckoutForm;
