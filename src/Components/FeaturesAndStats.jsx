import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaRocket,
  FaBoxOpen,
  FaUsers,
  FaTruck,
} from "react-icons/fa";

const FeaturesAndStats = () => {
  const [stats, setStats] = useState({ booked: 0, delivered: 0, users: 0 });

  useEffect(() => {
    axios
      .get("https://parcel-server-one.vercel.app/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="p-12 text-gray-800 bg-white">
      {/* Features Section */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-4xl font-bold text-center"
      >
        Why Choose Us?
      </motion.h2>
      <div className="grid gap-10 md:grid-cols-3">
        {[
          {
            icon: FaShieldAlt,
            title: "Secure Handling",
            desc: "We ensure your parcels are packaged and handled with care.",
            color: "text-blue-600",
          },
          {
            icon: FaRocket,
            title: "Fast Delivery",
            desc: "Same-day delivery available with express service.",
            color: "text-red-500",
          },
          {
            icon: FaBoxOpen,
            title: "Affordable Pricing",
            desc: "Get the best rates for all parcel types.",
            color: "text-green-600",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="p-6 text-center transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
          >
            <feature.icon className={`mx-auto text-5xl ${feature.color}`} />
            <h3 className="mt-4 text-2xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Statistics Section */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-16 mb-12 text-4xl font-bold text-center"
      >
        Our Impact
      </motion.h2>
      <div className="grid gap-10 md:grid-cols-3">
        {[
          {
            icon: FaTruck,
            title: "Total Parcels Booked",
            value: stats.booked,
            color: "text-yellow-500",
          },
          {
            icon: FaBoxOpen,
            title: "Total Parcels Delivered",
            value: stats.delivered,
            color: "text-green-500",
          },
          {
            icon: FaUsers,
            title: "Total Registered Users",
            value: stats.users,
            color: "text-purple-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="p-6 text-center transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
          >
            <stat.icon className={`mx-auto text-5xl ${stat.color}`} />
            <h3 className="mt-4 text-2xl font-semibold">{stat.title}</h3>
            <p className="mt-2 text-3xl font-bold text-gray-800">
              <CountUp end={stat.value} duration={3} separator="," />
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesAndStats;
