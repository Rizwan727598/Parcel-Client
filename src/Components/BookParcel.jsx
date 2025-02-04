import React, { useState } from "react";
import useAuth from "../Context/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const BookParcel = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    parcelType: "",
    weight: "",
    receiverName: "",
    receiverPhone: "",
    address: "",
    latitude: "",
    longitude: "",
    requestedDate: "",
    price: 0,
  });

  // Auto-calculate price based on weight
  const calculatePrice = (weight) => {
    if (weight <= 1) return 50;
    if (weight <= 2) return 100;
    return 150;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    if (name === "weight") updatedData.price = calculatePrice(value);
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newParcel = {
      ...formData,
      name: user.displayName,
      email: user.email,
      status: "Pending",
      bookingDate: new Date(),
    };

    try {
      await axios.post(
        "https://parcel-server-one.vercel.app/book-parcel",
        newParcel
      );
      Swal.fire("Success", "Parcel booked successfully!", "success");
      setFormData({
        phoneNumber: "",
        parcelType: "",
        weight: "",
        receiverName: "",
        receiverPhone: "",
        address: "",
        latitude: "",
        longitude: "",
        requestedDate: "",
        price: 0,
      });
    } catch (error) {
      Swal.fire("Error", "Failed to book parcel", "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 bg-gray-900/80 backdrop-blur-lg shadow-xl border border-gray-700 rounded-lg"
    >
      {/* Heading */}
      <h2 className="mb-6 text-3xl font-bold text-center text-teal-400">
        📦 Book a Parcel
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* User Info */}
        <input
          type="text"
          value={user.displayName}
          disabled
          className="bg-gray-700 text-white input w-full p-3 rounded-lg"
        />
        <input
          type="email"
          value={user.email}
          disabled
          className="bg-gray-700 text-white input w-full p-3 rounded-lg"
        />

        {/* Form Inputs */}
        <input
          type="text"
          name="phoneNumber"
          placeholder="Your Phone Number"
          onChange={handleChange}
          required
          className="input w-full p-3 rounded-lg border border-teal-500 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="parcelType"
          placeholder="Parcel Type (e.g., Documents, Electronics)"
          onChange={handleChange}
          required
          className="input w-full p-3 rounded-lg border border-teal-500 bg-gray-800 text-white"
        />
        <input
          type="number"
          name="weight"
          placeholder="Parcel Weight (kg)"
          onChange={handleChange}
          required
          className="input w-full p-3 rounded-lg border border-teal-500 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="receiverName"
          placeholder="Receiver’s Name"
          onChange={handleChange}
          required
          className="input w-full p-3 rounded-lg border border-teal-500 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="receiverPhone"
          placeholder="Receiver’s Phone Number"
          onChange={handleChange}
          required
          className="input w-full p-3 rounded-lg border border-teal-500 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          onChange={handleChange}
          required
          className="input w-full p-3 rounded-lg border border-teal-500 bg-gray-800 text-white"
        />
        <input
          type="date"
          name="requestedDate"
          onChange={handleChange}
          required
          className="input w-full p-3 rounded-lg border border-teal-500 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          onChange={handleChange}
          required
          className="input w-full p-3 rounded-lg border border-teal-500 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          onChange={handleChange}
          required
          className="input w-full p-3 rounded-lg border border-teal-500 bg-gray-800 text-white"
        />

        {/* Price Display */}
        <input
          type="text"
          value={`Price: ${formData.price} Tk`}
          disabled
          className="bg-gray-700 text-white input w-full p-3 rounded-lg font-semibold"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 text-white bg-teal-500 hover:bg-teal-600 transition w-full p-3 rounded-lg font-bold"
        >
          🚀 Book Parcel
        </button>
      </form>
    </motion.div>
  );
};

export default BookParcel;
