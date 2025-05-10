import React, { useEffect, useState } from "react";
import useAuth from "../Context/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FiPackage,
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiLoader,
} from "react-icons/fi";

const MyParcels = () => {
  const { user } = useAuth();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const res = await axios.get(
          `https://parcel-server-one.vercel.app/my-parcels/${user.email}`
        );
        setParcels(res.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to load parcels",
          text: error.response?.data?.message || "Please try again later",
          confirmButtonColor: "#38b2ac",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, [user]);

  const handleCancel = async (id, status) => {
    if (status !== "pending") {
      Swal.fire({
        icon: "error",
        title: "Cannot cancel",
        text: "Only pending parcels can be canceled",
        confirmButtonColor: "#38b2ac",
      });
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: "Cancel this parcel?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53e3e",
      cancelButtonColor: "#38b2ac",
      confirmButtonText: "Yes, cancel it!",
    });

    if (isConfirmed) {
      setProcessing(id);
      try {
        await axios.put(
          `https://parcel-server-one.vercel.app/cancel-parcel/${id}`
        );
        setParcels((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: "canceled" } : p))
        );
        Swal.fire({
          icon: "success",
          title: "Parcel canceled!",
          text: "Your parcel has been successfully canceled",
          confirmButtonColor: "#38b2ac",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Cancel failed",
          text: error.response?.data?.message || "Could not cancel the parcel",
          confirmButtonColor: "#38b2ac",
        });
      } finally {
        setProcessing(null);
      }
    }
  };

  const handleUpdate = (id, status) => {
    if (status !== "pending") {
      Swal.fire({
        icon: "error",
        title: "Cannot update",
        text: "Only pending parcels can be updated",
        confirmButtonColor: "#38b2ac",
      });
      return;
    }
    navigate(`/dashboard/update-parcel/${id}`);
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
          <h2 className="text-2xl font-semibold text-gray-800">My Parcels</h2>
          <p className="text-gray-500">View and manage your parcel bookings</p>
        </div>
      </div>

      {parcels.length === 0 ? (
        <div className="p-8 text-center rounded-lg bg-gray-50">
          <FiPackage className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-700">
            No parcels found
          </h3>
          <p className="mt-1 text-gray-500">
            You haven't booked any parcels yet
          </p>
        </div>
      ) : (
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
                      <FiPackage className="mr-2" /> Parcel Type
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" /> Requested Date
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Status
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
                {parcels.map((parcel) => (
                  <tr key={parcel._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {parcel.parcelType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(parcel.requestedDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          parcel.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : parcel.status === "canceled"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {parcel.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() =>
                            handleUpdate(parcel._id, parcel.status)
                          }
                          disabled={parcel.status !== "pending"}
                          className={`inline-flex items-center px-3 py-1 text-sm font-medium text-white transition bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            parcel.status !== "pending"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <FiEdit2 className="w-4 h-4 mr-1" />
                          Update
                        </button>
                        <button
                          onClick={() =>
                            handleCancel(parcel._id, parcel.status)
                          }
                          disabled={
                            parcel.status !== "pending" ||
                            processing === parcel._id
                          }
                          className={`inline-flex items-center px-3 py-1 text-sm font-medium text-white transition bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                            parcel.status !== "pending"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {processing === parcel._id ? (
                            <FiLoader className="w-4 h-4 mr-1 animate-spin" />
                          ) : (
                            <FiTrash2 className="w-4 h-4 mr-1" />
                          )}
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MyParcels;
