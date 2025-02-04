import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
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
      .catch((err) => console.error("❌ Error fetching stats:", err));
  }, []);

  return (
    <div className="p-8 bg-gray-100">
      {/* Features Section */}
      <h2 className="mb-6 text-3xl font-bold text-center">🚀 Why Choose Us?</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {/* Feature 1 */}
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <FaShieldAlt className="mx-auto text-5xl text-blue-500" />
          <h3 className="mt-4 text-xl font-semibold">
            📦 Secure Parcel Handling
          </h3>
          <p className="mt-2 text-gray-600">
            We ensure that your parcels are **securely packaged** and handled
            with care.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <FaRocket className="mx-auto text-5xl text-red-500" />
          <h3 className="mt-4 text-xl font-semibold">⚡ Super Fast Delivery</h3>
          <p className="mt-2 text-gray-600">
            **Same-day delivery** available for select locations with express
            service.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <FaBoxOpen className="mx-auto text-5xl text-green-500" />
          <h3 className="mt-4 text-xl font-semibold">💰 Affordable Pricing</h3>
          <p className="mt-2 text-gray-600">
            Get the **best rates** in the industry for all parcel types.
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <h2 className="mt-12 mb-6 text-3xl font-bold text-center">
        📊 Our Impact
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {/* Stat 1 */}
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <FaTruck className="mx-auto text-5xl text-yellow-500" />
          <h3 className="mt-4 text-xl font-semibold">Total Parcels Booked</h3>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            <CountUp end={stats.booked} duration={3} separator="," />
          </p>
        </div>
        {/* Stat 2 */}
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <FaBoxOpen className="mx-auto text-5xl text-green-500" />
          <h3 className="mt-4 text-xl font-semibold">
            Total Parcels Delivered
          </h3>
          <p className="mt-2 text-2xl font-bold text-red-600">
            <CountUp end={stats.delivered} duration={3} separator="," />
          </p>
        </div>
        {/* Stat 3 */}
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <FaUsers className="mx-auto text-5xl text-purple-500" />
          <h3 className="mt-4 text-xl font-semibold">Total Registered Users</h3>
          <p className="mt-2 text-2xl font-bold text-yellow-600">
            <CountUp end={stats.users} duration={3} separator="," />
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesAndStats;
