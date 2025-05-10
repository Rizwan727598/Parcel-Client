import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiUser,
  FiPieChart,
  FiUsers,
  FiTruck,
  FiStar,
  FiList,
  FiHome,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import useAuth from "../Context/useAuth";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Sidebar = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activePath, setActivePath] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { logOut } = useAuth();

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
    setActivePath(location.pathname);
  }, [userType, location.pathname, navigate]);

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have successfully logged out.",
        confirmButtonColor: "#38b2ac",
      });
      navigate("/signIn");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#38b2ac",
      });
    }
  };

  const navItems = {
    User: [
      {
        path: "/dashboard/book-parcel",
        icon: <FiPackage />,
        label: "Book Parcel",
      },
      { path: "/dashboard/my-parcels", icon: <FiList />, label: "My Parcels" },
      { path: "/dashboard/my-profile", icon: <FiUser />, label: "Profile" },
    ],
    DeliveryMen: [
      {
        path: "/dashboard/my-delivery-list",
        icon: <FiTruck />,
        label: "Deliveries",
      },
      { path: "/dashboard/my-reviews", icon: <FiStar />, label: "Reviews" },
    ],
    Admin: [
      {
        path: "/dashboard/statistics",
        icon: <FiPieChart />,
        label: "Statistics",
      },
      {
        path: "/dashboard/all-parcels",
        icon: <FiPackage />,
        label: "All Parcels",
      },
      { path: "/dashboard/all-users", icon: <FiUsers />, label: "All Users" },
      {
        path: "/dashboard/all-delivery-men",
        icon: <FiTruck />,
        label: "Delivery Team",
      },
    ],
  };

  if (!userType) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="w-8 h-8 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`h-screen bg-white shadow-sm flex flex-col ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen && (
          <h2 className="text-xl font-semibold text-gray-800">ParcelHub</h2>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-500 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <NavLink
          to="/"
          className={`flex items-center p-3 rounded-lg ${
            isOpen ? "justify-start" : "justify-center"
          } text-gray-600 hover:bg-teal-50 hover:text-teal-600`}
        >
          <FiHome className="text-lg" />
          {isOpen && <span className="ml-3">Home</span>}
        </NavLink>

        {navItems[userType]?.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 rounded-lg ${
              isOpen ? "justify-start" : "justify-center"
            } ${
              activePath === item.path
                ? "bg-teal-50 text-teal-600 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen && <span className="ml-3">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-3 rounded-lg ${
            isOpen ? "justify-start" : "justify-center"
          } text-gray-600 hover:bg-red-50 hover:text-red-600`}
        >
          <FiLogOut className="text-lg" />
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
        <div className="mt-2 text-xs text-center text-gray-400">
          {isOpen
            ? `ParcelHub © ${new Date().getFullYear()}`
            : `© ${new Date().getFullYear()}`}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
