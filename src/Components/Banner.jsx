import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div
      className="relative flex items-center justify-center h-[650px] md:h-[750px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/JWKYXL2F/Screenshot-2025-01-29-012141.png')",
      }} // Replace with actual image
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-6"
      >
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wide">
          The Future of Parcel Delivery 🚀
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Experience **faster, safer, and more reliable parcel deliveries.**
        </p>

        {/* Call-to-Action & Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300">
            Get Started
          </button>
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Track your parcel..."
              className="w-full p-4 pr-16 text-black rounded-lg shadow-md focus:outline-none"
            />
            <button className="absolute top-1/2 right-2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md font-semibold transition">
              Search
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
