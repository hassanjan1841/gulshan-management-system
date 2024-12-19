import axios from "axios";
import { appRoutes } from "../../constant/constant.js";

const VITE_API_URL = import.meta.env.VITE_API_URL;

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${appRoutes.getUsers}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get a single user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${appRoutes.getSingleUser}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

// Get a single user by email
export const loginUser = async (email) => {
  try {
    const response = await axios.post(`${appRoutes.login}`, { email });
    return response.data;
  } catch (error) {
    console.log("error in user js file", error);
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.log("Error response:", error.response);
      console.log("Message", error.response.data);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.log("Error message:", error.message);
    }
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(appRoutes.createUser, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update an existing user by ID
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(
      `${appRoutes.updateUser}/${userId}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${appRoutes.deleteUser}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};
