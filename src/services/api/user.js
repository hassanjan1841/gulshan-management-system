import axios from "axios";
import { appRoutes } from "../../constant/constant";

// Get all users
export const getAllUsers = async (
  role,
  page = "",
  limit = "",
  teacher = "",
  status = "",
  batch = "",
  course = "",
  search = ""
) => {
  try {
    const response = await axios.get(
      `${appRoutes.getUsers}?role=${role}&page=${page}&limit=${limit}${teacher && '&teacher=' + teacher}${status && '&status=' + status}${batch && '&batch=' + batch}${course && '&course=' + course}${search && '&search='+search}}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get a single user by ID
export const getUserById = async (token) => {
  try {
    const response = await axios.get(
      `${appRoutes.getSingleUser}`,
      token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("respones in getuserbyi d", response);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID}:`, error);
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
