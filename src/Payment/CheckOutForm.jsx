import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useScholarship from "./../Hooks/useScholarship";
import UseAuth from "../Hooks/useAuth";

const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const [transactionId, setTransactionId] = useState("");

  const [scholarship, refetch] = useScholarship();
  const totalPrice = scholarship.reduce(
    (total, item) => total + (isNaN(Number(item.applicationFees)) ? 0 : Number(item.applicationFees)),
    0
  );
  


//   console.log('checking');
//   console.log('total price',totalPrice)
//   console.log('scholarship',scholarship)
  const navigate = useNavigate();
  useEffect(() => {
    if (totalPrice > 0) {
        console.log('payment colled')
      axiosSecure
        .post("/create-payment-intent", { applicationFees: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm Error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in data base

        const Payment = {
          email: user.email,
          applicationFees: totalPrice,
          transactionId: paymentIntent.id,
          data: new Date(), //utc data convert use moment js to
          applicationIds: scholarship.map((item) => item._id),
          status: "pending",
        };
        const res = await axiosSecure.post("/payments", Payment);
        console.log("payment save", res.data);
        refetch();
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for Payment",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/paymentHistory");
        }
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          type="submit"
          className="btn-primary btn my-4"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">Your Transaction Id: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
