import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert("Payment failed!");
    } else {
      alert("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border rounded-md" />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-green-500 rounded-md"
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
