import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ order }) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const { price, email, carId, _id } = order;

  useEffect(() => {
    // Creating PaymentIntent when the page loads
    fetch("https://sell-my-car-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  console.log(carId);

  //Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    //get reference for mounted card element
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setSuccess("");
    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      console.log("card info", card);
      //Storing in Database
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        orderId: _id,
      };

      fetch("https://sell-my-car-server.vercel.app/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            //Update product to sold
            fetch(
              `https://sell-my-car-server.vercel.app/availableCars/${carId}`,
              {
                method: "PUT",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  available: false,
                  advertise: false,
                }),
              }
            ).then((data) => {
              console.log(data);
              setSuccess("Congrats! your payment completed");
              setTransactionId(paymentIntent.id);
            });
          }
        });
    }
    setProcessing(false);
  };

  return (
    <>
      <form className='max-w-2xl' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className='btn btn-sm mt-4 btn-primary'
          type='submit'
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      <p className='text-red-500'>{cardError}</p>
      {success && (
        <div>
          <p className='text-green-500'>{success}</p>
          <p>
            Your transactionId:{" "}
            <span className='font-bold'>{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
