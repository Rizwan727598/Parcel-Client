import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-12 pb-8 text-gray-700 bg-white border-t border-gray-200 shadow-lg"
    >
      <div className="max-w-screen-xl px-6 mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4 md:text-left">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-teal-600">ParcelHub</h2>
            <p className="mt-3 text-gray-600">
              Your trusted delivery partner. Fast, reliable, and secure.
            </p>
            <div className="flex justify-center mt-4 space-x-4 md:justify-start">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition duration-300 hover:text-teal-600"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition duration-300 hover:text-teal-600"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition duration-300 hover:text-teal-600"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-teal-600">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 transition duration-300 hover:text-teal-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 transition duration-300 hover:text-teal-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-600 transition duration-300 hover:text-teal-600"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 transition duration-300 hover:text-teal-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-teal-600">
              Contact Us
            </h3>
            <div className="space-y-3">
              <p className="flex items-center space-x-2">
                <FaEnvelope className="text-teal-600" />
                <span className="text-gray-600 transition duration-300 hover:text-teal-600">
                  support@parcelhub.com
                </span>
              </p>
              <p className="flex items-center space-x-2">
                <FaPhone className="text-teal-600" />
                <span className="text-gray-600 transition duration-300 hover:text-teal-600">
                  +1 234 567 890
                </span>
              </p>
              <p className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-teal-600" />
                <span className="text-gray-600 transition duration-300 hover:text-teal-600">
                  123 Delivery St, City, Country
                </span>
              </p>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-teal-600">
              Newsletter
            </h3>
            <p className="mb-4 text-gray-600">
              Subscribe to our newsletter for updates and offers.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white transition duration-300 bg-teal-600 rounded-lg hover:bg-teal-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between text-center md:flex-row md:text-left">
          {/* Copyright */}
          <p className="text-gray-600">
            © {new Date().getFullYear()} Parcel Hub. All rights reserved.
          </p>

          {/* Additional Links */}
          <div className="flex mt-4 space-x-4 md:mt-0">
            <Link
              to="/privacy-policy"
              className="text-gray-600 transition duration-300 hover:text-teal-600"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-gray-600 transition duration-300 hover:text-teal-600"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
