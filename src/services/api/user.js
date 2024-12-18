import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get a single user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

// Get a single user by email
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/user/email`, { email });
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw error;
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(VITE_API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update an existing user by ID
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${VITE_API_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${VITE_API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};
