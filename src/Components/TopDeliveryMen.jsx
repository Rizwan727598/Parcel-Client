import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const TopDeliveryMen = () => {
  const [topDeliveryMen, setTopDeliveryMen] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/top-delivery-men")
      .then((res) => setTopDeliveryMen(res.data))
      .catch((err) =>
        console.error("❌ Error fetching top delivery men:", err)
      );
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-center">
        🏆 Top 3 Delivery Men
      </h2>
      {topDeliveryMen.length === 0 ? (
        <p className="text-center text-gray-500">No delivery data available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topDeliveryMen.map((man) => (
            <div
              key={man._id}
              className="p-4 bg-gray-100 border rounded-lg shadow-lg"
            >
              <img
                src={man.image || "/default-avatar.png"}
                alt="Delivery Man"
                className="w-24 h-24 mx-auto rounded-full"
              />
              <h3 className="mt-2 text-xl font-bold text-center">{man.name}</h3>
              <p className="text-center text-gray-600">
                📦 Parcels Delivered: <strong>{man.totalDelivered}</strong>
              </p>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-${
                      index < Math.round(man.avgRating) ? "yellow" : "gray"
                    }-500`}
                  />
                ))}
              </div>
              <p className="text-center text-gray-600">
                ⭐ Avg Rating: <strong>{man.avgRating.toFixed(1)}/5</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopDeliveryMen;
