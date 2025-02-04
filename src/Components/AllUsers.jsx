import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://parcel-server-one.vercel.app/all-users")
      .then((res) => setUsers(res.data))
      .catch(() => console.error("Error fetching users"));
  }, []);

  const promoteUser = async (id, role) => {
    await axios.put(`https://parcel-server-one.vercel.app/promote-user/${id}`, {
      role,
    });
    setUsers(users.map((u) => (u._id === id ? { ...u, userType: role } : u)));
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
        👤 Manage Users
      </h2>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse min-w-[600px]">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="py-3 px-4 text-left whitespace-nowrap">User</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Phone</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Role</th>
              <th className="py-3 px-4 text-center whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-700 hover:bg-gray-800 transition"
              >
                {/* User Info */}
                <td className="py-4 px-4 flex items-center space-x-3">
                  <img
                    src={user.profileImage || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-teal-500 shadow-lg"
                  />
                  <span className="text-gray-300 font-semibold">
                    {user.name}
                  </span>
                </td>

                {/* Phone */}
                <td className="py-4 px-4 text-gray-300">
                  {user.phone || "N/A"}
                </td>

                {/* User Role */}
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                      user.userType === "Admin"
                        ? "bg-red-500 text-white"
                        : user.userType === "DeliveryMen"
                        ? "bg-yellow-500 text-gray-900"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {user.userType}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 text-center flex justify-center space-x-2">
                  {user.userType !== "Admin" && (
                    <button
                      onClick={() => promoteUser(user._id, "DeliveryMen")}
                      className="px-4 py-2 rounded-lg font-bold bg-yellow-500 hover:bg-yellow-600 transition text-gray-900"
                    >
                      🚚 Promote to Delivery
                    </button>
                  )}
                  {user.userType !== "Admin" && (
                    <button
                      onClick={() => promoteUser(user._id, "Admin")}
                      className="px-4 py-2 rounded-lg font-bold bg-red-500 hover:bg-red-600 transition text-white"
                    >
                      🔥 Promote to Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AllUsers;
