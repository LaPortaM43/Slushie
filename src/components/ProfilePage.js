import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api/auth";  // Ensure correct API method for fetching profile

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's profile data from the backend
    const fetchProfileData = async () => {
      try {
        const response = await getProfile();
        setUser(response.data);
        setFavorites(response.data.favorites);  // Adjust based on your response structure
        setOrders(response.data.orders);  // Adjust based on your response structure
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile. Please try again later.");
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.customerName}</p>
      <p>Email: {user.customerEmail}</p>
      <p>Address: {user.customerAddress}</p>

      <h3>Favorites</h3>
      <ul>
        {favorites.map((item) => (
          <li key={item.id}>{item.name}</li>  // Adjust based on your favorites structure
        ))}
      </ul>

      <h3>Orders</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>Order #{order.id} - {order.status}</li>  // Adjust based on your orders structure
        ))}
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ProfilePage;
