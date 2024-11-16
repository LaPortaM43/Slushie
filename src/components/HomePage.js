// HomePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="homepage">
      <div className="top-bar">
        <div className="menu-icon" onClick={toggleMenu}>☰</div>
        <div className="auth-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Sign Up</button>
        </div>
      </div>
      <div className={`menu ${menuOpen ? "show" : ""}`}>
        <p>Restaurant Name</p>
        <button onClick={() => navigate("/menu")}>Menu</button>
        <button onClick={() => navigate("/locations")}>Locations</button>
        <button onClick={() => navigate("/branches")}>Branches</button> {/* Link to BranchesList */}
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
