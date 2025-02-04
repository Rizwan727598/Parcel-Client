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
      setMenuOpen(false);
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
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur-lg shadow-xl border border-gray-700 px-6 py-3 rounded-full flex items-center justify-between w-[90%] max-w-5xl z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-lg font-bold tracking-wide text-teal-400 transition md:text-xl hover:opacity-80"
      >
        ParcelHub
      </Link>

      {/* Desktop Menu */}
      <div className="items-center hidden space-x-6 md:flex">
        <Link
          to="/"
          className="text-lg text-gray-300 transition hover:text-teal-300"
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
                className="transition border border-teal-400 rounded-full shadow-md w-9 h-9 hover:scale-105"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                <p className="px-4 py-3 font-semibold text-teal-300">
                  {user.displayName}
                </p>
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 text-gray-200 transition hover:text-teal-300 hover:bg-gray-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-3 text-left text-red-400 transition hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signIn"
            className="px-4 py-2 font-semibold text-white transition bg-teal-500 rounded-full shadow-md hover:bg-teal-600"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="text-2xl text-gray-300 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-lg shadow-xl border border-gray-700 rounded-lg p-5 w-[90%] max-w-[300px] flex flex-col items-center space-y-4 transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <Link
          to="/"
          className="text-lg text-gray-300 transition hover:text-teal-300"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>

        {user ? (
          <div className="relative w-full text-center">
            <button
              className="flex items-center justify-center space-x-2 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
                className="w-10 h-10 transition border border-teal-400 rounded-full shadow-md hover:scale-105"
              />
              <span className="text-teal-300">{user.displayName}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute w-48 transform -translate-x-1/2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg top-14 left-1/2">
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 text-gray-200 transition hover:text-teal-300 hover:bg-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-3 text-left text-red-400 transition hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signIn"
            className="px-6 py-2 font-semibold text-white transition bg-teal-500 rounded-full shadow-md hover:bg-teal-600"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
