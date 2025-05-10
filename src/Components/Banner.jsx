import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co.com/G4c4zpkD/Screenshot-2025-03-08-234135.png"
          alt="Banner"
          className="object-cover w-full h-full"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white"
      >
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl font-bold leading-tight tracking-tight md:text-7xl"
        >
          Deliver Smarter, <span className="text-teal-400">Not Harder</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl mx-auto mt-6 text-lg text-gray-200 md:text-2xl"
        >
          Experience the future of parcel delivery with{" "}
          <strong className="font-semibold text-teal-400">
            speed, reliability, and precision.
          </strong>
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row"
        >
          {/* Get Started Button */}
          <button className="px-8 py-3 text-lg font-semibold text-white transition duration-300 bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
            Get Started
          </button>

          {/* Learn More Button */}
          <button className="px-8 py-3 text-lg font-semibold text-teal-600 transition duration-300 bg-transparent border-2 border-teal-600 rounded-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
            Learn More
          </button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-8 text-sm text-gray-300 md:text-base"
        >
          Trusted by over{" "}
          <strong className="font-semibold text-teal-400">1 million</strong>{" "}
          customers worldwide.
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;
