import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);

const Payment = () => {
  const order = useLoaderData();
  const { carId, carName, email, price } = order;
  return (
    <div className='wax-w-4xl mx-auto'>
      <h2 className='mt-4 mb-6 text-3xl font-semibold pl-2'>
        Payment for {order.carName}
      </h2>
      <p>please pay ${price} to confirm your purchase</p>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm order={order}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
