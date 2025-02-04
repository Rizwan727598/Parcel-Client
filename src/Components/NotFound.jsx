import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="mt-2 text-lg text-gray-700">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
