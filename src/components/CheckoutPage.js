import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("orderDetails"));
    if (savedOrder) {
      setOrderDetails(savedOrder);
    } else {
      setError("No order details found.");
    }
  }, []);

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to log in to place an order.");
      return;
    }

    try {
      const response = await fetch("/api/orders/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        localStorage.removeItem("orderDetails");
        navigate("/profile");
      } else {
        setError("Failed to place order.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place order.");
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orderDetails ? (
        <div>
          <h2>Order Summary</h2>
          <p><strong>Restaurant:</strong> {orderDetails.restaurant}</p>
          <p><strong>Pickup Slot:</strong> {orderDetails.pickupSlot}</p>
          <p><strong>Base:</strong> {orderDetails.base}</p>
          <p><strong>Flavors:</strong> {orderDetails.flavors.join(", ")}</p>
          <p><strong>Price:</strong> ${orderDetails.price}</p>
          <button onClick={handleConfirmOrder}>Confirm and Place Order</button>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
}

export default CheckoutPage;


