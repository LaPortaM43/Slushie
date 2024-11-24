// api/flavorApi.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/flavors';

export const getAllFlavors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Ensure the response structure is correct
  } catch (error) {
    console.error("There was an error fetching the flavors:", error);
    throw error;
  }
};
