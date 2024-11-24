import axios from 'axios';

const API_URL = 'http://localhost:5000/auth'; // Ensure this matches your backend URL and port

// Register function with updated parameters
export const register = async (customerName, customerEmail, customerAddress, customerPassword) => {
  try {
    console.log('Sending registration data:', {
      customerName,
      customerEmail,
      customerAddress,
      customerPassword,
    });

    const response = await axios.post(`${API_URL}/register`, {
      customerName,
      customerEmail,
      customerAddress,
      customerPassword,
    });
    
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Login function remains the same
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // Save the JWT token to local storage after login
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to fetch user profile (to be used after login)
export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No token found, please log in.");
    }

    const response = await axios.get('http://localhost:5000/user/profile', { // Updated to `/user/profile`
      headers: {
        Authorization: `Bearer ${token}`, // Pass token for authentication
      },
    });
    
    console.log('Profile data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Logout function to clear the session
export const logout = () => {
  localStorage.removeItem('token'); // Remove the token from local storage
  console.log('User logged out');
};
