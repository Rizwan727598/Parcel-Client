import React, { useEffect, useState } from "react";
import useAuth from "../Context/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FiPackage,
  FiUser,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

const MyDeliveryList = () => {
  const { user } = useAuth();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(
            `https://parcel-server-one.vercel.app/my-deliveries/${user.email}`
          );
          setParcels(res.data.filter((parcel) => parcel.status !== "Pending"));
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed to load deliveries",
            text: error.response?.data?.message || "Please try again later",
            confirmButtonColor: "#38b2ac",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDeliveries();
  }, [user]);

  const handleDeliver = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Confirm Delivery",
      text: "Mark this parcel as delivered?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#38b2ac",
      cancelButtonColor: "#e53e3e",
      confirmButtonText: "Yes, mark as delivered",
      cancelButtonText: "Cancel",
    });

    if (isConfirmed) {
      try {
        const { data } = await axios.put(
          `https://parcel-server-one.vercel.app/update-parcel/${id}`,
          { status: "Delivered" }
        );

        if (data.updatedParcel) {
          setParcels((prev) => prev.filter((parcel) => parcel._id !== id));
          Swal.fire({
            icon: "success",
            title: "Delivery Confirmed!",
            text: "Parcel status updated to Delivered",
            confirmButtonColor: "#38b2ac",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text:
            error.response?.data?.message || "Could not update parcel status",
          confirmButtonColor: "#38b2ac",
        });
      }
    }
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
            My Deliveries
          </h2>
          <p className="text-gray-500">Assigned parcels ready for delivery</p>
        </div>
      </div>

      {parcels.length === 0 ? (
        <div className="p-8 text-center rounded-lg bg-gray-50">
          <FiPackage className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-700">
            No deliveries assigned
          </h3>
          <p className="mt-1 text-gray-500">
            You currently have no parcels to deliver
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
                      <FiUser className="mr-2" /> Sender
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    <div className="flex items-center">
                      <FiUser className="mr-2" /> Receiver
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
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" /> Requested
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    <div className="flex items-center">
                      <FiClock className="mr-2" /> Delivery By
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    <div className="flex items-center">
                      <FiMapPin className="mr-2" /> Address
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {parcels.map((parcel) => (
                  <tr key={parcel._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {parcel.userName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {parcel.receiverName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {parcel.receiverPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(parcel.requestedDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(
                          parcel.approximateDeliveryDate
                        ).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-[200px] truncate">
                        {parcel.receiverAddress}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          parcel.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {parcel.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      {parcel.status !== "Delivered" && (
                        <button
                          onClick={() => handleDeliver(parcel._id)}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white transition bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                          <FiCheckCircle className="w-4 h-4 mr-1" />
                          Deliver
                        </button>
                      )}
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

export default MyDeliveryList;
