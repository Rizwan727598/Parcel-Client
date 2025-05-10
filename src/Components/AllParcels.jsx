import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPackage,
  FiTruck,
  FiCalendar,
  FiDollarSign,
  FiUser,
  FiPhone,
  FiX,
  FiCheck,
} from "react-icons/fi";

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [assignedDeliveryMan, setAssignedDeliveryMan] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [parcelsRes, deliveryMenRes] = await Promise.all([
          axios.get("https://parcel-server-one.vercel.app/all-parcels"),
          axios.get("https://parcel-server-one.vercel.app/delivery-men"),
        ]);
        setParcels(parcelsRes.data);
        setDeliveryMen(deliveryMenRes.data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleManageParcel = (parcel) => {
    setSelectedParcel(parcel);
    setShowModal(true);
    setAssignedDeliveryMan("");
    setDeliveryDate("");
  };

  const handleAssignDeliveryMan = async () => {
    if (!assignedDeliveryMan || !deliveryDate) {
      return Swal.fire(
        "Error",
        "Please select both delivery man and date",
        "error"
      );
    }

    try {
      await axios.put(
        `https://parcel-server-one.vercel.app/assign-parcel/${selectedParcel._id}`,
        {
          deliveryManId: assignedDeliveryMan,
          approximateDeliveryDate: deliveryDate,
        }
      );

      Swal.fire("Success", "Parcel assigned successfully!", "success");
      setShowModal(false);
      // Refresh data
      const res = await axios.get(
        "https://parcel-server-one.vercel.app/all-parcels"
      );
      setParcels(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to assign parcel", "error");
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: "bg-amber-100 text-amber-800",
      Delivered: "bg-green-100 text-green-800",
      Shipped: "bg-blue-100 text-blue-800",
      default: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusStyles[status] || statusStyles.default
        }`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
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
            Parcel Management
          </h2>
          <p className="text-gray-500">View and manage all parcel deliveries</p>
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
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" /> Booking Date
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
                  <div className="flex items-center">
                    <FiDollarSign className="mr-2" /> Cost
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
                    <div className="text-sm font-medium text-gray-900">
                      {parcel.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {parcel.phoneNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(parcel.bookingDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(parcel.requestedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {parcel.price} Tk
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(parcel.status)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <button
                      onClick={() => handleManageParcel(parcel)}
                      className="px-3 py-1 text-sm text-white transition bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedParcel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-white rounded-lg shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    <FiTruck className="inline mr-2 text-teal-600" />
                    Assign Delivery
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1 text-gray-400 transition rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Delivery Man
                  </label>
                  <select
                    value={assignedDeliveryMan}
                    onChange={(e) => setAssignedDeliveryMan(e.target.value)}
                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Select delivery man</option>
                    {deliveryMen.map((man) => (
                      <option key={man._id} value={man._id}>
                        {man.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAssignDeliveryMan}
                    disabled={!assignedDeliveryMan || !deliveryDate}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiCheck className="w-4 h-4 mr-2" />
                    Assign
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AllParcels;
