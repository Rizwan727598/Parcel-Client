import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiPhone,
  FiTruck,
  FiShield,
  FiArrowUp,
  FiLoader,
} from "react-icons/fi";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoting, setPromoting] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://parcel-server-one.vercel.app/all-users"
        );
        setUsers(res.data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch users", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const promoteUser = async (id, role) => {
    setPromoting(id);
    try {
      await axios.put(
        `https://parcel-server-one.vercel.app/promote-user/${id}`,
        { role }
      );
      setUsers(users.map((u) => (u._id === id ? { ...u, userType: role } : u)));
      Swal.fire("Success", `User promoted to ${role}`, "success");
    } catch (error) {
      Swal.fire("Error", "Failed to promote user", "error");
    } finally {
      setPromoting(null);
    }
  };

  const getRoleBadge = (role) => {
    const roleStyles = {
      Admin: "bg-red-100 text-red-800",
      DeliveryMen: "bg-amber-100 text-amber-800",
      User: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleStyles[role]}`}
      >
        {role === "DeliveryMen" ? "Delivery" : role}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-white shadow-sm rounded-xl"
    >
      <div className="flex flex-col justify-between mb-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            User Management
          </h2>
          <p className="text-gray-500">Manage user roles and permissions</p>
        </div>
      </div>

      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  <div className="flex items-center">
                    <FiUser className="mr-2" /> User
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  <div className="flex items-center">
                    <FiPhone className="mr-2" /> Phone
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={user.profileImage || "/default-avatar.png"}
                          alt={user.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {user.phone || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.userType)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <div className="flex justify-end space-x-2">
                      {user.userType !== "Admin" && (
                        <button
                          onClick={() => promoteUser(user._id, "DeliveryMen")}
                          disabled={promoting === user._id}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium transition border border-transparent rounded-md text-amber-800 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                          {promoting === user._id ? (
                            <FiLoader className="w-3 h-3 mr-1 animate-spin" />
                          ) : (
                            <FiTruck className="w-3 h-3 mr-1" />
                          )}
                          Delivery
                        </button>
                      )}
                      {user.userType !== "Admin" && (
                        <button
                          onClick={() => promoteUser(user._id, "Admin")}
                          disabled={promoting === user._id}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-red-800 transition bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                          {promoting === user._id ? (
                            <FiLoader className="w-3 h-3 mr-1 animate-spin" />
                          ) : (
                            <FiShield className="w-3 h-3 mr-1" />
                          )}
                          Admin
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AllUsers;
