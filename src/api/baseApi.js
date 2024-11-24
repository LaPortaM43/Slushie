// api/baseApi.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/bases';

export const getAllBases = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Ensure the response structure is what you expect
  } catch (error) {
    console.error("There was an error fetching the bases:", error);
    throw error;
  }
};
