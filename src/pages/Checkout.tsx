import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { socket } from "./socket"; // <-- Import socket

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // ===============================================
  // Listen For Real-Time Order Updates (Socket.io)
  // ===============================================
  useEffect(() => {
    // Listen for real-time updates
    socket.on("orderUpdate", (data) => {
      console.log("📡 Real-time update received:", data);
      alert("Order Status: " + data.status);
    });

    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("🔴 Socket connection error:", err.message);
      alert("Socket error: " + err.message);
    });

    return () => {
      socket.off("orderUpdate");
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []);

  // ==============================
  // Create Order API Call
  // ==============================
  const createOrder = async () => {
    setLoading(true);

    const demoData = {
      items: [
        { title: "Product 1", price: 10, quantity: 3 },
        { title: "Product 2", price: 10, quantity: 10 },
      ],
      paymentMethod: "stripe",
    };
    // oms-server.devmehedi.com
    const res = await fetch("https://oms-server.devmehedi.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtaWowZWV5dzAwMDBpZ2xoNWN3YTk1OTAiLCJ1c2VybmFtZSI6Ik1laGVkaSBIYXNzYW4iLCJlbWFpbCI6ImRyZWFtbWVoZWRpaGFzc2FuQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzY0MzQ2ODI4LCJleHAiOjE3NjQ5NTE2Mjh9.PHDILciGlXhgaTInhAAMj_czAsrirOSBfWr1_4pxx2w",
      },
      body: JSON.stringify(demoData),
    });

    const json = await res.json();

    const clientSecret = json?.data?.data?.paymentInfo?.clientSecret;

    if (!clientSecret) {
      alert("Client secret not found!");
      setLoading(false);
      return;
    }

    console.log("Client Secret:", clientSecret);

    await confirmPayment(clientSecret);
    setLoading(false);
  };

  // ==============================
  // Confirm Payment with Stripe
  // ==============================
  const confirmPayment = async (clientSecret) => {
    if (!stripe || !elements) {
      alert("Stripe not loaded");
      return;
    }

    const card = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: "test@gmail.com",
        },
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("🔥 Payment Successful! Backend webhook should fire now");
      } else {
        alert("Payment status: " + result.paymentIntent.status);
      }
    }
  };
  const stripePromise = loadStripe(
    "pk_test_51Rbyr32Kr5nrbbDmWgLY3Gr2Gu5OVaraQUWPa5K6EBQnNnXzTs0DYteFoyKo7ETKL0xwinY5mPWoCr7JQxBo7T1M00RX8mYQQw"
  );

  return (
    <Elements stripe={stripePromise}>
      <div style={{ maxWidth: 400, margin: "auto" }}>
        <h2>Order Payment</h2>

        <CardElement />

        <button onClick={createOrder} disabled={!stripe || loading}>
          {loading ? "Processing..." : "Create Order & Pay"}
        </button>
      </div>
    </Elements>
  );
}
