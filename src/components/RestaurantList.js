import React, { useEffect, useState } from "react";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("/api/restaurants");
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
        } else {
          setError("Failed to load restaurants.");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("Failed to load restaurants.");
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h1>Restaurants</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {restaurants.length > 0 ? (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.restaurantID}>
              <strong>{restaurant.restaurantName}</strong> - ID: {restaurant.restaurantID}
              <p>Address: {restaurant.address}</p>
              <p>Phone: {restaurant.phone}</p>
              <p>Hours: {restaurant.hours}</p>
              <p>Pickup Options: {restaurant.pickupOptions.join(", ")}</p>
              <p>Pickup Time Slots: {restaurant.pickupTimeSlots.join(", ")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No restaurants found.</p>
      )}
    </div>
  );
}

export default RestaurantList;
