import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/80 backdrop-blur-lg shadow-xl border-t border-gray-700 text-gray-300 pt-10"
    >
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-teal-400">Parcel Hub</h2>
            <p className="mt-2 text-gray-400">Your trusted delivery partner</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-teal-400">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/" className="hover:text-teal-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-300 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-300 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-300 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-teal-400">Contact Us</h3>
            <p className="mt-3 flex items-center justify-center md:justify-start space-x-2">
              <FaEnvelope className="text-teal-400" />{" "}
              <span>support@parcelhub.com</span>
            </p>
            <p className="mt-2 flex items-center justify-center md:justify-start space-x-2">
              <FaPhone className="text-teal-400" /> <span>+1 234 567 890</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Social Media & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          {/* Social Icons */}
          <div className="flex space-x-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition"
            >
              <FaFacebook className="cursor-pointer" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition"
            >
              <FaTwitter className="cursor-pointer" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition"
            >
              <FaInstagram className="cursor-pointer" />
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-4 md:mt-0 text-gray-400">
            © {new Date().getFullYear()} Parcel Hub. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
