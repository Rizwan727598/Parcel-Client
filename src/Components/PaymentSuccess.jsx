import React from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Confetti />
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful! 🎉
      </h1>
      <button
        onClick={() => navigate("/dashboard")}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
