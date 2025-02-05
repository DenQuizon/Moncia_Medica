import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import registere from "../assets/register.json";
import Lottie from "lottie-react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import UseAxiosPublic from "../CUstomHooks/UseAxiosPublic";

const img_hosting_key = import.meta.env.VITE_IMBB_API;
const imghosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
const Signup = () => {
  const { createUser, updateprofile } = useContext(AuthContext);

  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = UseAxiosPublic();

  const register = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.files[0];
    const role = e.target.role.value;

    const formData = new FormData();
    formData.append("image", photo);

    axios
      .post(imghosting_api, formData)
      .then((imageResponse) => {
        const imageUrl = imageResponse.data.data.display_url;

        // Password validation
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passRegex.test(password)) {
          setPassError(
            "Password must have at least one uppercase, one lowercase, and be at least 6 characters long."
          );
          return;
        }

        // Create user in Firebase
        createUser(email, password)
          .then(() => {
            updateprofile({ displayName: name, photoURL: imageUrl })
              .then(() => {
                // Save user to the database
                const user = {
                  name,
                  email,
                  photoURL: imageUrl,
                  role: role,
                  status: "",
                };
                axiosPublic
                  .post("/users", user)
                  .then((response) => {
                    console.log(response.data);
                    if (response.data.insertedId) {
                      Swal.fire({
                        title: "Account Created",
                        text: `Welcome, ${name}!`,
                        icon: "success",
                        confirmButtonText: "OK",
                      });
                      navigate(location?.state ? location.state : "/");
                    } else {
                      Swal.fire({
                        title: "Error",
                        text: "Failed to save user in the database.",
                        icon: "error",
                        confirmButtonText: "OK",
                      });
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                    Swal.fire({
                      title: "Error",
                      text: "Error saving user to the database.",
                      icon: "error",
                      confirmButtonText: "OK",
                    });
                  });
              })
              .catch((err) => {
                console.error(err);
                Swal.fire({
                  title: "Error",
                  text: "Error updating user profile.",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "Error",
              text: "Error creating user in Firebase.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "Error uploading photo.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });

    e.target.reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="flex flex-col gap-5 md:flex-row-reverse md:flex-row items-center justify-center">
        <div>
          <Lottie animationData={registere} />
        </div>
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h2>

          <form onSubmit={register} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Photo URL
              </label>
              <input
                type="file"
                name="photo"
                placeholder="Upload your photo"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Select Role
              </label>
              <select
                name="role"
                className="select select-bordered w-full focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled selected>
                  Choose your role
                </option>
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="bg-transparent btn btn-xs absolute right-4 bottom-3"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
              {passError && (
                <p className="text-xs text-red-500 mt-1">{passError}</p>
              )}
            </div>

            {/* General Error Message */}
            {generalError && (
              <p className="text-sm text-red-500 bg-red-100 p-2 rounded">
                {generalError}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-2 hover:bg-blue-600"
            >
              Register
            </button>
          </form>

          {/* Footer Links */}
          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <NavLink to={"/login"} className="text-blue-500 hover:underline">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
