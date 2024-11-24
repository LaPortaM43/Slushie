// src/components/BranchesList.js
import React, { useState, useEffect } from "react";
import "./BranchesList.css"; // Ensure correct styling

const BranchesList = () => {
  const [branches, setBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For location search input
  const [filteredBranches, setFilteredBranches] = useState([]);

  // Fetch branches from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/branches")
      .then((response) => response.json())
      .then((data) => {
        setBranches(data);
        setFilteredBranches(data); // Initial filter includes all branches
      })
      .catch((error) => console.error("Error fetching branches:", error));
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    // Filter branches based on search term
    if (query) {
      setFilteredBranches(
        branches.filter((branch) =>
          branch.branchName.toLowerCase().includes(query.toLowerCase()) // Update field name to match API response
        )
      );
    } else {
      setFilteredBranches(branches); // If search is empty, show all branches
    }
  };

  return (
    <div className="branches-container">
      <h2>Find a Location</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="City, State, Zip Code"
        className="location-search-bar"
      />
      <h3>Branches:</h3>
      <ul>
        {filteredBranches.length > 0 ? (
          filteredBranches.map((branch) => (
            <li key={branch.branchID}>
              <h4>{branch.branchName}</h4> {/* Update field name to match API response */}
              <p>{branch.branchAddress}</p>
            </li>
          ))
        ) : (
          <li>No branches found</li>
        )}
      </ul>
    </div>
  );
};

export default BranchesList;
