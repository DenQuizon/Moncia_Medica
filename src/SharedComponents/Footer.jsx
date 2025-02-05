import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#a7dada] text-gray-800">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Newsletter Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Stay updated with the latest offers and healthcare news.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border rounded focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">Contact Us</h2>
          <p className="text-sm text-gray-600">Email: support@medishop.com</p>
          <p className="text-sm text-gray-600">Phone: +123-456-7890</p>
          <p className="text-sm text-gray-600">
            Address: 123 Health St, MedCity
          </p>
        </div>

        {/* About Us Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">About Us</h2>
          <p className="text-sm text-gray-600">
            We are dedicated to providing quality medicines and healthcare
            products. Our mission is to make healthcare accessible for everyone.
          </p>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">Follow Us</h2>
          <div className="flex gap-4 text-gray-800">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-800 text-center text-gray-400 py-4">
        <p>© 2025 MediShop. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
