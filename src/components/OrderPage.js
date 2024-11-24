// src/components/OrderPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBases } from "../api/baseApi";  // Correct import
import { getAllFlavors } from "../api/flavorApi";  // Correct import
import "../components/OrderPage.css";

function OrderPage() {
  const [bases, setBases] = useState([]);  // State for bases
  const [flavors, setFlavors] = useState([]);  // State for flavors
  const [selectedBase, setSelectedBase] = useState([]);  // Selected bases
  const [selectedFlavors, setSelectedFlavors] = useState([]);  // Selected flavors
  const [selectedSlot, setSelectedSlot] = useState("");  // Selected pickup slot
  const navigate = useNavigate();

  // Static pickup slots list
  const pickupSlots = [
    { slotID: 1, slotTime: "10:00 AM - 11:00 AM" },
    { slotID: 2, slotTime: "11:00 AM - 12:00 PM" },
    { slotID: 3, slotTime: "12:00 PM - 1:00 PM" },
    { slotID: 4, slotTime: "1:00 PM - 2:00 PM" },
  ];

  // Fetch bases and flavors
  useEffect(() => {
    const getBasesAndFlavors = async () => {
      try {
        // Fetch bases and flavors data using the imported API functions
        const [baseData, flavorData] = await Promise.all([
          getAllBases(),
          getAllFlavors(),
        ]);
        
        // Debugging: Log the fetched data
        console.log("Fetched bases data:", baseData);
        console.log("Fetched flavors data:", flavorData);

        // Only update state if data exists
        if (baseData && baseData.length > 0 && flavorData && flavorData.length > 0) {
          setBases(baseData);
          setFlavors(flavorData);
        } else {
          console.error("Fetched data is empty or invalid.");
        }
      } catch (error) {
        console.error("Error fetching bases and flavors:", error);
      }
    };

    getBasesAndFlavors();
  }, []);

  // Calculate the price based on selected base and flavors
  const calculatePrice = (selectedBase, selectedFlavors) => {
    let basePrice = 2.00; // Default base price
    let flavorPrice = selectedFlavors.length * 0.50; // $0.50 per selected flavor
    return basePrice + flavorPrice;
  };

  // Handle base selection changes
  const handleBaseChange = (event, baseName) => {
    if (event.target.checked) {
      setSelectedBase([...selectedBase, baseName]);
    } else {
      setSelectedBase(selectedBase.filter((base) => base !== baseName));
    }
  };

  // Handle flavor selection changes
  const handleFlavorChange = (event, flavorName) => {
    if (event.target.checked) {
      setSelectedFlavors([...selectedFlavors, flavorName]);
    } else {
      setSelectedFlavors(selectedFlavors.filter((flavor) => flavor !== flavorName));
    }
  };

  // Handle form submission (for placing the order)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderDetails = {
      base: selectedBase,
      flavors: selectedFlavors,
      pickupSlot: selectedSlot,
      price: calculatePrice(selectedBase, selectedFlavors),
    };

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails)); // Store order details in localStorage
    navigate("/checkout"); // Navigate to the checkout page
  };

  return (
    <div className="order-container">
      <h1>Order Your Drink!</h1>
      <form onSubmit={handleSubmit}>
        {/* Base selection with checkboxes */}
        <div className="form-group">
          <h2>Select Base:</h2>
          {bases.length > 0 ? (
            bases.map((base) => (
              <div key={base.baseID}>
                <input
                  type="checkbox"
                  id={base.baseID}
                  name="base"
                  value={base.baseName}
                  onChange={(e) => handleBaseChange(e, base.baseName)}
                />
                <label htmlFor={base.baseID}>{base.baseName}</label>
              </div>
            ))
          ) : (
            <p>Loading bases...</p>
          )}
        </div>

        {/* Flavor selection with checkboxes */}
        <div className="form-group">
          <h2>Select Flavors:</h2>
          {flavors.length > 0 ? (
            flavors.map((flavor) => (
              <div key={flavor.flavorID}>
                <input
                  type="checkbox"
                  id={flavor.flavorID}
                  name="flavor"
                  value={flavor.flavorName}
                  onChange={(e) => handleFlavorChange(e, flavor.flavorName)}
                />
                <label htmlFor={flavor.flavorID}>{flavor.flavorName}</label>
              </div>
            ))
          ) : (
            <p>Loading flavors...</p>
          )}
        </div>

        {/* Pickup slot selection */}
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

        {/* Order summary */}
        <div className="order-summary">
          <h3>Your Order:</h3>
          <p><strong>Base:</strong> {selectedBase.join(", ")}</p>
          <p><strong>Flavors:</strong> {selectedFlavors.join(", ")}</p>
          <p><strong>Pickup Slot:</strong> {selectedSlot}</p>
          <p><strong>Price:</strong> ${calculatePrice(selectedBase, selectedFlavors).toFixed(2)}</p>
        </div>

        <button type="submit" className="order-button">Go to Checkout</button>
      </form>
    </div>
  );
}

export default OrderPage;
