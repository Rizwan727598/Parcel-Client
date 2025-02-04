import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaUser,
  FaChartBar,
  FaUsers,
  FaTruck,
  FaStar,
  FaList,
  FaHome,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-redirect based on user type
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      if (userType === "Admin") {
        navigate("/dashboard/statistics");
      } else if (userType === "User") {
        navigate("/dashboard/book-parcel");
      } else if (userType === "DeliveryMen") {
        navigate("/dashboard/my-delivery-list");
      }
    }
  }, [userType, location.pathname, navigate]);

  if (!userType)
    return <p className="text-center text-gray-500">Loading Sidebar...</p>;

  return (
    <div
      className={`h-screen bg-gray-900/80 backdrop-blur-lg shadow-xl border border-gray-700 transition-all ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col rounded-lg overflow-hidden`}
    >
      {/* Toggle & Home Button */}
      <div className="flex items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="flex items-center text-lg font-bold text-teal-400 tracking-wide hover:opacity-80 transition"
        >
          <FaHome className="text-2xl" />
          {isOpen && <span className="ml-3">Home</span>}
        </NavLink>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-teal-400 text-2xl p-2 hover:bg-gray-800 rounded-md transition"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-2">
        {userType === "User" && (
          <>
            <NavLink
              to="/dashboard/book-parcel"
              className="flex items-center p-3 rounded-lg transition hover:bg-teal-500"
            >
              <FaBox className="text-lg" />
              {isOpen && <span className="ml-3">Book a Parcel</span>}
            </NavLink>
            <NavLink
              to="/dashboard/my-parcels"
              className="flex items-center p-3 rounded-lg transition hover:bg-teal-500"
            >
              <FaList className="text-lg" />
              {isOpen && <span className="ml-3">My Parcels</span>}
            </NavLink>
            <NavLink
              to="/dashboard/my-profile"
              className="flex items-center p-3 rounded-lg transition hover:bg-teal-500"
            >
              <FaUser className="text-lg" />
              {isOpen && <span className="ml-3">My Profile</span>}
            </NavLink>
          </>
        )}

        {userType === "DeliveryMen" && (
          <>
            <NavLink
              to="/dashboard/my-delivery-list"
              className="flex items-center p-3 rounded-lg transition hover:bg-teal-500"
            >
              <FaTruck className="text-lg" />
              {isOpen && <span className="ml-3">My Delivery List</span>}
            </NavLink>
            <NavLink
              to="/dashboard/my-reviews"
              className="flex items-center p-3 rounded-lg transition hover:bg-teal-500"
            >
              <FaStar className="text-lg" />
              {isOpen && <span className="ml-3">My Reviews</span>}
            </NavLink>
          </>
        )}

        {userType === "Admin" && (
          <>
            <NavLink
              to="/dashboard/statistics"
              className="flex items-center p-3 rounded-lg transition hover:bg-teal-500"
            >
              <FaChartBar className="text-lg" />
              {isOpen && <span className="ml-3">Statistics</span>}
            </NavLink>
            <NavLink
              to="/dashboard/all-parcels"
              className="flex items-center p-3 rounded-lg transition hover:bg-teal-500"
            >
              <FaBox className="text-lg" />
              {isOpen && <span className="ml-3">All Parcels</span>}
            </NavLink>
            <NavLink
              to="/dashboard/all-users"
              className="flex items-center p-3 rounded-lg transition hover:bg-teal-500"
            >
              <FaUsers className="text-lg" />
              {isOpen && <span className="ml-3">All Users</span>}
            </NavLink>
            <NavLink
              to="/dashboard/all-delivery-men"
              className="flex items-center p-3 rounded-lg transition hover:bg-teal-500"
            >
              <FaTruck className="text-lg" />
              {isOpen && <span className="ml-3">All Delivery Men</span>}
            </NavLink>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 text-sm text-center text-gray-400">
        {isOpen
          ? "Parcel Hub © " + new Date().getFullYear()
          : "© " + new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Sidebar;
