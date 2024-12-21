import axios from "axios";
import { appRoutes } from "../../../constant/constant.js";

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
export const getUserById = async (userId, token) => {
  console.log("userId", userId, token);

  try {
    const response = await axios.get(
      `${appRoutes.getSingleUser}/${userId}`,
      token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    console.error("error in user js file", error);
    throw error;
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
