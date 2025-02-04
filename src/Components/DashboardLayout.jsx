import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import useAuth from "../Context/useAuth";
import axios from "axios";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const [userType, setUserType] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      axios
        .get(`http://localhost:8000/user/${user.email}`)
        .then((res) => {
          if (res.data?.userType) {
            setUserType(res.data.userType);
          } else {
            navigate("/"); // Redirect if no userType found
          }
        })
        .catch(() => navigate("/")) // Redirect if API fails
        .finally(() => setIsFetching(false)); // Stop loading
    } else if (!loading && !user) {
      navigate("/signIn"); // Redirect if not logged in
    }
  }, [user, loading, navigate]);

  if (loading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-semibold text-gray-700 dark:text-gray-200"
        >
          Loading Dashboard...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar userType={userType} />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;
