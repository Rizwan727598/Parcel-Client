import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [assignedDeliveryMan, setAssignedDeliveryMan] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/all-parcels")
      .then((res) => setParcels(res.data))
      .catch(() => Swal.fire("Error", "Failed to fetch parcels", "error"));

    axios
      .get("http://localhost:8000/delivery-men")
      .then((res) => setDeliveryMen(res.data))
      .catch(() => Swal.fire("Error", "Failed to fetch delivery men", "error"));
  }, []);

  const handleManageParcel = (parcel) => {
    setSelectedParcel(parcel);
    setShowModal(true);
  };

  const handleAssignDeliveryMan = async () => {
    if (!assignedDeliveryMan || !deliveryDate) {
      return Swal.fire(
        "Error",
        "Please select a delivery man and date",
        "error"
      );
    }

    try {
      await axios.put(
        `http://localhost:8000/assign-parcel/${selectedParcel._id}`,
        {
          deliveryManId: assignedDeliveryMan,
          approximateDeliveryDate: deliveryDate,
        }
      );

      Swal.fire("Success", "Parcel assigned successfully!", "success");
      setShowModal(false);
    } catch (error) {
      Swal.fire("Error", "Failed to assign parcel", "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 border border-gray-700 rounded-lg shadow-xl bg-gray-900/80 backdrop-blur-lg"
    >
      {/* Heading */}
      <h2 className="mb-6 text-3xl font-bold text-center text-teal-400">
        📦 Manage Parcels
      </h2>

      {/* Responsive Table Wrapper */}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead className="text-gray-300 bg-gray-800">
            <tr>
              <th className="p-3 text-left whitespace-nowrap">User</th>
              <th className="p-3 text-left whitespace-nowrap">Phone</th>
              <th className="p-3 text-left whitespace-nowrap">Booking Date</th>
              <th className="p-3 text-left whitespace-nowrap">
                Requested Date
              </th>
              <th className="p-3 text-left whitespace-nowrap">Cost</th>
              <th className="p-3 text-left whitespace-nowrap">Status</th>
              <th className="p-3 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr
                key={parcel._id}
                className="transition border-t border-gray-700 hover:bg-gray-800"
              >
                <td className="p-3">{parcel.name}</td>
                <td className="p-3">{parcel.phoneNumber}</td>
                <td className="p-3">
                  {new Date(parcel.bookingDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {new Date(parcel.requestedDate).toLocaleDateString()}
                </td>
                <td className="p-3">{parcel.price} Tk</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-lg font-semibold ${
                      parcel.status === "Pending"
                        ? "bg-yellow-500 text-gray-900"
                        : parcel.status === "Delivered"
                        ? "bg-green-500 text-white"
                        : "bg-blue-400 text-white"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleManageParcel(parcel)}
                    className="px-4 py-2 font-bold text-white transition bg-teal-500 rounded-lg hover:bg-teal-600"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedParcel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md p-6 border border-gray-700 rounded-lg shadow-xl bg-gray-900/80 backdrop-blur-lg"
          >
            <h3 className="mb-4 text-xl font-bold text-teal-400">
              🚚 Assign Delivery Man
            </h3>

            {/* Delivery Man Selection */}
            <label className="block mb-2 font-semibold text-gray-300">
              Choose Delivery Man:
            </label>
            <select
              className="w-full p-3 text-white bg-gray-800 border border-teal-500 rounded-lg"
              onChange={(e) => setAssignedDeliveryMan(e.target.value)}
            >
              <option value="">Select</option>
              {deliveryMen.map((man) => (
                <option key={man._id} value={man._id}>
                  {man.name}
                </option>
              ))}
            </select>

            {/* Delivery Date Selection */}
            <label className="block mt-4 mb-2 font-semibold text-gray-300">
              Delivery Date:
            </label>
            <input
              type="date"
              className="w-full p-3 text-white bg-gray-800 border border-teal-500 rounded-lg"
              onChange={(e) => setDeliveryDate(e.target.value)}
            />

            {/* Modal Actions */}
            <div className="flex justify-end mt-6 space-x-2">
              <button
                className="px-4 py-2 font-bold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                onClick={() => setShowModal(false)}
              >
                ❌ Cancel
              </button>
              <button
                className="px-4 py-2 font-bold text-white transition bg-green-500 rounded-lg hover:bg-green-600"
                onClick={handleAssignDeliveryMan}
              >
                ✅ Assign
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default AllParcels;
