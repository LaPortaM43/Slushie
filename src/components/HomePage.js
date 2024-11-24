import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logout } from "../api/auth"; // Import necessary functions
import "./HomePage.css";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // To hold user profile data
  const navigate = useNavigate();

  // Toggle menu visibility
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Fetch user profile if logged in
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getProfile(); // Fetch profile if user is logged in
        setUser(profileData); // Set user data if successfully fetched
      } catch (error) {
        console.error("No user data available or user is not logged in", error);
      }
    };

    fetchUserProfile(); // Call the function to fetch the user profile
  }, []);

  // Logout function
  const handleLogout = () => {
    logout(); // Call the logout function from auth.js
    setUser(null); // Clear user data on logout
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="homepage">
      <div className="top-bar">
        <div className="menu-icon" onClick={toggleMenu}>☰</div>
        
        {/* Profile Icon and Menu */}
        {user && (
          <div className="profile-menu">
            <button className="profile-icon" onClick={toggleMenu}>👤</button>
            <div className={`profile-dropdown ${menuOpen ? "show" : ""}`}>
              <button onClick={() => navigate("/profile")}>Profile</button>
              <button onClick={() => navigate("/billing")}>Billing</button>
              <button onClick={() => navigate("/orders")}>Orders</button>
              <button onClick={() => navigate("/favorites")}>Favorites</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}

        <div className="auth-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Sign Up</button>
        </div>
      </div>

      <div className={`menu ${menuOpen ? "show" : ""}`}>
        <p>Restaurant Name</p>
        <button onClick={() => navigate("/menu")}>Menu</button>
        <button onClick={() => navigate("/branches")}>Branches</button>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Sign Up</button>
      </div>

      <div className="content">
        <h1>Welcome to Our Restaurant!</h1>
        <button className="order-button" onClick={() => navigate("/order")}>
          Place Your Order
        </button>
      </div>
    </div>
  );
}

export default HomePage;
