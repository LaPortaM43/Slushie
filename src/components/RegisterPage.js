import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth"; // Import the updated API function

function RegisterPage() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      // Use the updated register function from auth.js
      await register(customerName, customerEmail, customerAddress, customerPassword);
      navigate("/login"); // Redirect to login page if registration is successful
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <input
          type="password"
          value={customerPassword}
          onChange={(e) => setCustomerPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
