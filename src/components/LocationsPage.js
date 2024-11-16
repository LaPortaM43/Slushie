import React from "react";
import "./LocationsPage.css";

function LocationsPage() {
  return (
    <div className="locations-container">
      <h2>Find a Location</h2>
      <input
        type="text"
        placeholder="City, State, Zip Code"
        className="location-search-bar"
      />
    </div>
  );
}

export default LocationsPage;
