import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("your-publishable-stripe-key-here");

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  const createPaymentIntent = async () => {
    const res = await fetch(
      "https://parcel-server-one.vercel.app/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 50 }),
      }
    );
    const data = await res.json();
    setClientSecret(data.clientSecret);
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-center">
        Pay for Your Parcel
      </h2>
      <button
        onClick={createPaymentIntent}
        className="px-4 py-2 text-white bg-blue-500 rounded-md"
      >
        Proceed to Payment
      </button>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
