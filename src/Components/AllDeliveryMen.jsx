import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AllDeliveryMen = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);

  useEffect(() => {
    axios
      .get("https://parcel-server-one.vercel.app/delivery-men")
      .then((res) => setDeliveryMen(res.data))
      .catch(() => https://parcel-server-one.vercel.app.error("Error fetching delivery men"));
  }, []);

  // Function to color-code reviews
  const getReviewBadge = (rating) => {
    if (rating >= 4.5)
      return "bg-green-500 text-white px-3 py-1 text-sm font-semibold rounded-lg";
    if (rating >= 3)
      return "bg-yellow-500 text-gray-900 px-3 py-1 text-sm font-semibold rounded-lg";
    return "bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded-lg";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-900/80 backdrop-blur-lg shadow-xl border border-gray-700 rounded-lg"
    >
      {/* Heading */}
      <h2 className="mb-6 text-3xl font-bold text-center text-teal-400">
        🚚 Delivery Men Overview
      </h2>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse min-w-[600px]">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="py-3 px-4 text-left whitespace-nowrap">
                Delivery Man
              </th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Phone</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">
                Parcels Delivered
              </th>
              <th className="py-3 px-4 text-left whitespace-nowrap">
                Avg Review
              </th>
            </tr>
          </thead>
          <tbody>
            {deliveryMen.map((man) => (
              <tr
                key={man._id}
                className="border-t border-gray-700 hover:bg-gray-800 transition"
              >
                {/* Delivery Man Info */}
                <td className="py-4 px-4 flex items-center space-x-3">
                  <img
                    src={man.profileImage || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-teal-500 shadow-lg"
                  />
                  <span className="text-gray-300 font-semibold">
                    {man.name}
                  </span>
                </td>

                {/* Phone Number */}
                <td className="py-4 px-4 text-gray-300">
                  {man.phoneNumber || "N/A"}
                </td>

                {/* Parcels Delivered */}
                <td className="py-4 px-4 font-semibold text-blue-400">
                  {man.parcelsDelivered || 0}
                </td>

                {/* Average Review */}
                <td className="py-4 px-4">
                  <span className={getReviewBadge(man.averageReview)}>
                    {man.averageReview || "No Reviews"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AllDeliveryMen;
