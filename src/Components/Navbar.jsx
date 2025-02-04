import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../Context/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have successfully logged out.",
      });
      setDropdownOpen(false);
      navigate("/");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur-lg shadow-xl border border-gray-700 px-8 py-3 rounded-full flex items-center justify-between w-[90%] max-w-5xl z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-bold text-teal-400 tracking-wide hover:opacity-80 transition"
      >
        ParcelHub
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 items-center">
        <Link
          to="/"
          className="text-gray-300 hover:text-teal-300 transition text-lg"
        >
          Home
        </Link>
        {user ? (
          <div className="relative">
            <button
              className="focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
                className="w-9 h-9 rounded-full border border-teal-400 shadow-md transition hover:scale-105"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
                <p className="px-4 py-3 font-semibold text-teal-300">
                  {user.displayName}
                </p>
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 text-gray-200 hover:text-teal-300 hover:bg-gray-700 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signIn"
            className="px-5 py-2 bg-teal-500 text-white font-semibold rounded-full shadow-md hover:bg-teal-600 transition"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-gray-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;
