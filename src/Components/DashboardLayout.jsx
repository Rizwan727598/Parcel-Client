import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import useAuth from "../Context/useAuth";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiLoader } from "react-icons/fi";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { user, loading: authLoading } = useAuth();
  const [userType, setUserType] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserType = async () => {
      if (!authLoading && user) {
        try {
          const res = await axios.get(
            `https://parcel-server-one.vercel.app/user/${user.email}`
          );

          if (res.data?.userType) {
            setUserType(res.data.userType);
          } else {
            setError("User role not found");
            navigate("/");
          }
        } catch (err) {
          setError("Failed to fetch user data");
          navigate("/");
        } finally {
          setIsFetching(false);
        }
      } else if (!authLoading && !user) {
        navigate("/signIn");
      }
    };

    fetchUserType();
  }, [user, authLoading, navigate]);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error,
    });
    return null;
  }

  if (authLoading || isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center p-8 rounded-lg"
        >
          <FiLoader className="w-12 h-12 mb-4 text-teal-600 animate-spin" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Preparing your dashboard...
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Loading your personalized workspace
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar userType={userType} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto transition-all duration-300">
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
