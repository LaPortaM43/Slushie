import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/OrderPage.css";

function OrderPage() {
  const [drinks, setDrinks] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [pickupSlots, setPickupSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [base, setBase] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getDrinks = async () => {
      try {
        const response = await fetch("/api/drinks");
        const drinksData = await response.json();
        setDrinks(drinksData);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };

    const getRestaurants = async () => {
      try {
        const response = await fetch("/api/restaurants");
        const restaurantsData = await response.json();
        setRestaurants(restaurantsData);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    getDrinks();
    getRestaurants();
  }, []);
  useEffect(() => {
    if (selectedRestaurant) {
      const getPickupSlots = async () => {
        try {
          const response = await fetch(`/api/pickup-slots/${selectedRestaurant}`);
          const slotsData = await response.json();
          setPickupSlots(slotsData);
        } catch (error) {
          console.error("Error fetching pickup slots:", error);
        }
      };
      getPickupSlots();
    }
  }, [selectedRestaurant]);

  const calculatePrice = (base, selectedFlavor) => {
    let basePrice = 2.00;
    let flavorPrice = selectedFlavor ? 0.50 : 0; 
    return basePrice + flavorPrice;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderDetails = {
      restaurant: selectedRestaurant,
      base,
      flavor: selectedFlavor,
      pickupSlot: selectedSlot,
      price: calculatePrice(base, selectedFlavor),
    };

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    navigate("/checkout");
  };

  return (
    <div className="order-container">
      <h1>Order Your Drink!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="restaurant">Select Restaurant:</label>
          <select
            id="restaurant"
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            required
          >
            <option value="">--Select Restaurant--</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.restaurantID} value={restaurant.restaurantID}>
                {restaurant.restaurantName} - {restaurant.address}
              </option>
            ))}
          </select>
        </div>

        {pickupSlots.length > 0 && (
          <div className="form-group">
            <label htmlFor="pickupSlot">Select Pickup Slot:</label>
            <select
              id="pickupSlot"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              required
            >
              <option value="">--Select Pickup Slot--</option>
              {pickupSlots.map((slot) => (
                <option key={slot.slotID} value={slot.slotID}>
                  {slot.slotTime}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="base">Select Base:</label>
          <select id="base" value={base} onChange={(e) => setBase(e.target.value)} required>
            <option value="">--Select Base--</option>
            {drinks.map((drink) => (
              <option key={drink.id} value={drink.base}>
                {drink.base}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="flavor">Select Flavor:</label>
          <select id="flavor" value={selectedFlavor} onChange={(e) => setSelectedFlavor(e.target.value)} required>
            <option value="">--Select Flavor--</option>
            {drinks.map((drink) => (
              <option key={drink.flavorID} value={drink.flavorName}>
                {drink.flavorName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="order-button">Go to Checkout</button>
      </form>
    </div>
  );
}

export default OrderPage;
