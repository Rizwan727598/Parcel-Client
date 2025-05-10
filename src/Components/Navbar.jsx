import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../Context/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/services", name: "Services" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-sm py-3 border-b border-gray-100"
          : "bg-white py-4"
      }`}
    >
      <div className="container flex items-center justify-between px-5 mx-auto max-w-7xl">
        {/* Logo with enhanced styling */}
        <Link to="/" className="flex items-center group">
          <div className="flex items-center justify-center w-10 h-10 mr-3 transition-colors duration-300 bg-teal-600 rounded-lg group-hover:bg-teal-700">
            <span className="text-xl font-bold text-white">P</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            <span className="text-teal-600">arcel</span>Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="items-center hidden space-x-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative text-sm font-medium text-gray-600 transition duration-300 hover:text-teal-600 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {user ? (
            <div className="relative ml-4 dropdown-container">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="flex items-center justify-center w-10 h-10 text-white bg-teal-600 rounded-full">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <FaUser />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium truncate">
                          {user.displayName}
                        </p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50"
                      >
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/signIn"
              className="px-5 py-2.5 ml-4 text-sm font-medium text-white transition duration-300 bg-teal-600 rounded-lg hover:bg-teal-700 flex items-center"
            >
              <FaUser className="mr-2" />
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 text-gray-600 transition duration-300 rounded-md md:hidden hover:bg-gray-50 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 bg-white shadow-lg top-20 md:hidden"
            >
              <div className="flex flex-col px-5 py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="py-2 text-base font-medium text-gray-600 border-b border-gray-100 hover:text-teal-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {user ? (
                  <div className="pt-4 space-y-4 border-t border-gray-200">
                    <Link
                      to="/dashboard"
                      className="block py-2 text-base font-medium text-gray-600 hover:text-teal-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full py-2 text-base font-medium text-left text-red-600"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/signIn"
                    className="flex items-center justify-center px-4 py-3 mt-2 text-base font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-teal-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUser className="mr-2" />
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
