import React, { useState } from "react";
import useAuth from "../Context/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FiPackage,
  FiUser,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiNavigation,
  FiLoader,
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaWeightHanging } from "react-icons/fa";
import { MdLocationOn, MdNotes } from "react-icons/md";

const BookParcel = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    parcelType: "",
    weight: "",
    receiverName: "",
    receiverPhone: "",
    address: "",
    latitude: "",
    longitude: "",
    requestedDate: "",
    price: 0,
    deliveryNotes: "",
    fragile: false,
    insurance: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [locationLoading, setLocationLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Vibrant purple/pink color scheme
  const colors = {
    primary: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
    secondary: "bg-pink-500 hover:bg-pink-600",
    error: "border-red-500 text-red-600",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    text: {
      primary: "text-gray-800",
      secondary: "text-gray-600",
      disabled: "text-gray-400",
    },
    border: "border-purple-200",
    card: "bg-white",
    highlight: "text-purple-600",
    icon: "text-pink-500",
    stepActive: "bg-purple-600 text-white",
    stepInactive: "bg-gray-200 text-gray-600",
  };

  const PRICE_TIERS = [
    { maxWeight: 1, price: 50 },
    { maxWeight: 3, price: 100 },
    { maxWeight: 5, price: 150 },
    { maxWeight: 10, price: 250 },
    { maxWeight: Infinity, price: 400 },
  ];

  const PARCEL_TYPES = [
    { value: "Documents", label: "Documents" },
    { value: "Electronics", label: "Electronics" },
    { value: "Clothing", label: "Clothing" },
    { value: "Food", label: "Food" },
    { value: "Furniture", label: "Furniture" },
    { value: "Medical", label: "Medical Supplies" },
    { value: "Other", label: "Other" },
  ];

  const calculatePrice = (weight, isFragile, hasInsurance) => {
    if (!weight) return 0;
    const tier = PRICE_TIERS.find((t) => weight <= t.maxWeight);
    let basePrice = tier ? tier.price : 0;

    // Add premiums
    if (isFragile) basePrice += 50;
    if (hasInsurance) basePrice += basePrice * 0.2; // 20% for insurance

    return basePrice;
  };

  const validateForm = () => {
    const newErrors = {};

    // Step 1 validation
    if (currentStep === 1) {
      if (!formData.parcelType)
        newErrors.parcelType = "Please select parcel type";
      if (!formData.weight || formData.weight <= 0)
        newErrors.weight = "Weight must be greater than 0";
      if (!formData.receiverName)
        newErrors.receiverName = "Receiver name is required";
      if (
        !formData.receiverPhone ||
        !/^01[3-9]\d{8}$/.test(formData.receiverPhone)
      ) {
        newErrors.receiverPhone = "Valid Bangladeshi phone number required";
      }
    }

    // Step 2 validation
    if (currentStep === 2) {
      if (!formData.address) newErrors.address = "Delivery address is required";
      if (!formData.requestedDate)
        newErrors.requestedDate = "Delivery date is required";
      else if (new Date(formData.requestedDate) < new Date()) {
        newErrors.requestedDate = "Date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "weight" || name === "fragile" || name === "insurance") {
        updated.price = calculatePrice(
          name === "weight" ? value : updated.weight,
          name === "fragile" ? checked : updated.fragile,
          name === "insurance" ? checked : updated.insurance
        );
      }
      return updated;
    });
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      Swal.fire({
        icon: "error",
        title: "Geolocation not supported",
        text: "Your browser doesn't support geolocation",
        background: "#ffffff",
        confirmButtonColor: "#7c3aed",
      });
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        }));
        setLocationLoading(false);
        Swal.fire({
          icon: "success",
          title: "Location captured!",
          text: "Your current coordinates have been added",
          timer: 1500,
          background: "#ffffff",
          confirmButtonColor: "#7c3aed",
        });
      },
      (error) => {
        setLocationLoading(false);
        Swal.fire({
          icon: "error",
          title: "Location error",
          text: error.message,
          background: "#ffffff",
          confirmButtonColor: "#7c3aed",
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: Object.values(errors)
          .map((err) => `<p>• ${err}</p>`)
          .join(""),
        background: "#ffffff",
        confirmButtonColor: "#7c3aed",
      });
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsSubmitting(true);
    const newParcel = {
      ...formData,
      senderName: user.displayName,
      senderEmail: user.email,
      senderPhone: user.phoneNumber || "",
      status: "Pending",
      bookingDate: new Date().toISOString(),
      price: parseFloat(formData.price),
    };

    try {
      const response = await axios.post(
        "https://parcel-server-one.vercel.app/book-parcel",
        newParcel,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed!",
          html: `
            <div class="text-left ${colors.text.primary}">
              <p class="mb-2"><strong>Tracking ID:</strong> ${
                response.data.trackingId || "N/A"
              }</p>
              <p><strong>Estimated Price:</strong> ${formData.price} Tk</p>
            </div>
          `,
          background: "#ffffff",
          confirmButtonColor: "#7c3aed", // Purple
        });

        // Reset form
        setFormData({
          parcelType: "",
          weight: "",
          receiverName: "",
          receiverPhone: "",
          address: "",
          latitude: "",
          longitude: "",
          requestedDate: "",
          deliveryNotes: "",
          price: 0,
          fragile: false,
          insurance: false,
        });
        setCurrentStep(1);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: error.response?.data?.message || "Please try again later",
        footer: error.response?.data?.details || "",
        background: "#ffffff",
        confirmButtonColor: "#7c3aed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex flex-col items-center w-1/3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= step ? colors.stepActive : colors.stepInactive
            }`}
          >
            {step}
          </div>
          <div
            className={`mt-2 text-sm ${
              currentStep >= step
                ? `${colors.highlight} font-medium`
                : `${colors.text.secondary}`
            }`}
          >
            {step === 1 && "Parcel Details"}
            {step === 2 && "Delivery Info"}
            {step === 3 && "Confirmation"}
          </div>
          {step < 3 && (
            <div
              className={`h-1 w-full mt-4 ${
                currentStep > step ? "bg-purple-600" : "bg-gray-200"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* User Info Section */}
            <div
              className={`grid grid-cols-1 gap-6 p-6 rounded-lg ${colors.card} sm:grid-cols-2 border ${colors.border}`}
            >
              <div className="flex items-center space-x-3">
                <FiUser className={colors.icon} />
                <div className="flex-1">
                  <label
                    className={`block text-sm font-medium ${colors.text.primary}`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={user.displayName}
                    disabled
                    className={`w-full p-3 mt-1 ${colors.text.primary} bg-purple-50 rounded-lg`}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiUser className={colors.icon} />
                <div className="flex-1">
                  <label
                    className={`block text-sm font-medium ${colors.text.primary}`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className={`w-full p-3 mt-1 ${colors.text.primary} bg-purple-50 rounded-lg`}
                  />
                </div>
              </div>
            </div>

            {/* Parcel Details */}
            <div
              className={`grid grid-cols-1 gap-6 p-6 rounded-lg ${colors.card} border ${colors.border}`}
            >
              <div>
                <label
                  className={`block mb-1 text-teal-700 font-medium ${colors.text.primary}`}
                >
                  <FiPackage className="inline mr-2" />
                  Parcel Type
                </label>
                <select
                  name="parcelType"
                  value={formData.parcelType}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                    errors.parcelType ? colors.error : colors.border
                  }`}
                >
                  <option value="">Select parcel type</option>
                  {PARCEL_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.parcelType && (
                  <p className="flex items-center mt-1 text-sm text-red-600">
                    <FiAlertCircle className="mr-1" /> {errors.parcelType}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block mb-1 text-teal-700 font-medium ${colors.text.primary}`}
                >
                  <FaWeightHanging className="inline mr-2" />
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  min="0.1"
                  step="0.1"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 2.5"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                    errors.weight ? colors.error : colors.border
                  }`}
                />
                {errors.weight && (
                  <p className="flex items-center mt-1 text-sm text-red-600">
                    <FiAlertCircle className="mr-1" /> {errors.weight}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Note: Maximum weight limit is 20kg. Extra charges apply for
                  heavier parcels.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className={`block mb-1 text-teal-700 font-medium ${colors.text.primary}`}
                  >
                    <FiUser className="inline mr-2" />
                    Receiver Name
                  </label>
                  <input
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                      errors.receiverName ? colors.error : colors.border
                    }`}
                  />
                  {errors.receiverName && (
                    <p className="flex items-center mt-1 text-sm text-red-600">
                      <FiAlertCircle className="mr-1" /> {errors.receiverName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className={`block mb-1 text-teal-700 font-medium ${colors.text.primary}`}
                  >
                    <FiUser className="inline mr-2" />
                    Receiver Phone
                  </label>
                  <input
                    type="tel"
                    name="receiverPhone"
                    value={formData.receiverPhone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                      errors.receiverPhone ? colors.error : colors.border
                    }`}
                  />
                  {errors.receiverPhone && (
                    <p className="flex items-center mt-1 text-sm text-red-600">
                      <FiAlertCircle className="mr-1" /> {errors.receiverPhone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="fragile"
                    name="fragile"
                    checked={formData.fragile}
                    onChange={handleChange}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label
                    htmlFor="fragile"
                    className={`ml-2 ${colors.text.primary}`}
                  >
                    Fragile Items (+50৳)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="insurance"
                    name="insurance"
                    checked={formData.insurance}
                    onChange={handleChange}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label
                    htmlFor="insurance"
                    className={`ml-2 ${colors.text.primary}`}
                  >
                    Add Insurance (+20%)
                  </label>
                </div>
              </div>

              <div>
                <label
                  className={`block mb-1 text-teal-700 font-medium ${colors.text.primary}`}
                >
                  <FiDollarSign className="inline mr-2" />
                  Estimated Price
                </label>
                <input
                  type="text"
                  value={`${formData.price} Tk`}
                  readOnly
                  className={`w-full p-3 font-bold ${colors.highlight} border ${colors.border} rounded-lg bg-purple-50`}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div
              className={`grid grid-cols-1 gap-6 p-6 rounded-lg ${colors.card} border ${colors.border}`}
            >
              <div>
                <label
                  className={`block mb-1 text-teal-700 font-medium ${colors.text.primary}`}
                >
                  <FiMapPin className="inline mr-2" />
                  Delivery Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full address with area, city, etc."
                  rows="3"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                    errors.address ? colors.error : colors.border
                  }`}
                />
                {errors.address && (
                  <p className="flex items-center mt-1 text-sm text-red-600">
                    <FiAlertCircle className="mr-1" /> {errors.address}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block mb-1 text-teal-700 font-medium ${colors.text.primary}`}
                >
                  <FiCalendar className="inline mr-2" />
                  Requested Delivery Date
                </label>
                <input
                  type="date"
                  name="requestedDate"
                  min={today}
                  max={maxDateStr}
                  value={formData.requestedDate}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                    errors.requestedDate ? colors.error : colors.border
                  }`}
                />
                {errors.requestedDate && (
                  <p className="flex items-center mt-1 text-sm text-red-600">
                    <FiAlertCircle className="mr-1" /> {errors.requestedDate}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Delivery times are between 9AM-6PM on selected date
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className={`block mb-1 text-teal-700 font-medium ${colors.text.primary}`}
                  >
                    <FiNavigation className="inline mr-2" />
                    Latitude
                  </label>
                  <input
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="e.g. 23.8103"
                    className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                  />
                </div>
                <div>
                  <label
                    className={`block mb-1 text-teal-700 font-medium ${colors.text.primary}`}
                  >
                    <FiNavigation className="inline mr-2" />
                    Longitude
                  </label>
                  <input
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="e.g. 90.4125"
                    className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={locationLoading}
                className={`flex items-center justify-center w-full py-2 px-4 border border-purple-500 ${
                  colors.highlight
                } rounded-lg hover:bg-purple-50 ${
                  locationLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {locationLoading ? (
                  <>
                    <svg
                      className="w-4 h-4 mr-2 -ml-1 text-purple-600 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Getting Location...
                  </>
                ) : (
                  <>
                    <MdLocationOn className="mr-2" />
                    Use My Current Location
                  </>
                )}
              </button>

              <div>
                <label
                  className={`block mb-1 text-teal-700 font-medium ${colors.text.primary}`}
                >
                  <MdNotes className="inline mr-2" />
                  Delivery Notes (Optional)
                </label>
                <textarea
                  name="deliveryNotes"
                  value={formData.deliveryNotes}
                  onChange={handleChange}
                  placeholder="Special instructions for delivery"
                  rows="2"
                  className={`w-full p-3 border ${colors.border} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-lg border ${colors.border} bg-purple-50`}
            >
              <h3
                className={`text-lg font-semibold ${colors.highlight} mb-3 flex items-center`}
              >
                <FiInfo className="mr-2" /> Order Summary
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Parcel Type</p>
                    <p className="font-medium">{formData.parcelType || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">
                      {formData.weight ? `${formData.weight} kg` : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Receiver</p>
                    <p className="font-medium">
                      {formData.receiverName || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Receiver Phone</p>
                    <p className="font-medium">
                      {formData.receiverPhone || "-"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Delivery Date</p>
                    <p className="font-medium">
                      {formData.requestedDate
                        ? new Date(formData.requestedDate).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fragile</p>
                    <p className="font-medium">
                      {formData.fragile ? "Yes (+50৳)" : "No"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Insurance</p>
                    <p className="font-medium">
                      {formData.insurance ? "Yes (+20%)" : "No"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delivery Address</p>
                    <p className="font-medium">{formData.address || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-purple-200">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-700">
                    Estimated Delivery Price
                  </p>
                  <p className={`text-2xl font-bold ${colors.highlight}`}>
                    {formData.price}৳
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-lg border border-yellow-200 bg-yellow-50`}
            >
              <h3
                className={`text-lg font-semibold text-yellow-700 mb-2 flex items-center`}
              >
                <FiAlertCircle className="mr-2" /> Important Notes
              </h3>
              <ul className="pl-5 space-y-1 text-sm text-yellow-700 list-disc">
                <li>Payment will be collected upon delivery</li>
                <li>Please ensure the receiver will be available</li>
                <li>Contact us immediately if any information is incorrect</li>
                <li>Our delivery hours are 9AM-6PM</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`max-w-4xl p-6 mx-auto ${colors.card} rounded-xl shadow-md border ${colors.border}`}
    >
      <div className="mb-6 text-center">
        <h2 className={`text-3xl font-bold ${colors.highlight}`}>
          New Parcel Booking
        </h2>
        <p className={`${colors.text.secondary} mt-2`}>
          Fill in the details to book your parcel
        </p>
      </div>

      {renderStepIndicator()}

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStepContent()}

        <div className="flex justify-between pt-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className={`py-3 px-6 rounded-lg bg-purple-100 ${colors.highlight} font-medium flex items-center`}
            >
              <FiChevronLeft className="mr-1" /> Back
            </button>
          ) : (
            <div></div> // Empty div to maintain flex space-between
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`py-3 px-8 rounded-lg text-white font-medium ${
              colors.primary
            } ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            } flex items-center`}
          >
            {currentStep < 3 ? (
              <>
                Continue <FiChevronRight className="ml-1" />
              </>
            ) : isSubmitting ? (
              <>
                <svg
                  className="w-4 h-4 mr-2 -ml-1 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Confirming...
              </>
            ) : (
              <>
                <FiCheckCircle className="mr-2" />
                Confirm Booking
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default BookParcel;
