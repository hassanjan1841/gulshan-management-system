import axios from "axios";
import { appRoutes } from "../../constant/constant";

// Fetch all branches with pagination and filters
export const getBranches = async (page, limit) => {
  try {
    const response = await axios.get(
      `${appRoutes.getBranches}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single branch by ID
export const getSingleBranch = async (id) => {
  try {
    const response = await axios.get(`${appRoutes.getSingleBranch}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching branch:", error);
    throw error;
  }
};

// Create a new branch
export const createBranch = async (branch, token) => {
  try {
    const response = await axios.post(
      appRoutes.createBranch,
      branch,
      token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating branch:", error);
    throw error;
  }
};

// Update a branch by ID
export const updateBranch = async (id, branch) => {
  try {
    const response = await axios.put(`${appRoutes.updateBranch}/${id}`, branch);
    return response.data;
  } catch (error) {
    console.error("Error updating branch:", error);
    throw error;
  }
};

// Delete a branch by ID
export const deleteBranch = async (id) => {
  try {
    const response = await axios.delete(`${appRoutes.deleteBranch}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting branch:", error);
    throw error;
  }
};

// Fetch branches by course ID (if applicable)
export const getBranchesByCourseId = async (courseId) => {
  try {
    const response = await axios.get(
      `${appRoutes.getBranchesByCourseId}/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching branches by course ID:", error);
    throw error;
  }
};

export const getAllCountriesFromBranches = async () => {
  try {
    const response = await axios.get(
      `${appRoutes.getBranches}?createNewBranch=true`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching countries from batches with admission open:",
      error
    );
    throw error;
  }
};

export const getAllCitiesByCountry = async (country) => {
  try {
    const response = await axios.get(
      `${appRoutes.getBranches}?country=${country}`
    );

    return response.data; // Return unique cities
  } catch (error) {
    console.error("Error fetching cities by country:", error);
    throw error;
  }
};
export const getAllBranchesByCities = async (city, country) => {
  try {
    const response = await axios.get(
      `${appRoutes.getBranches}?city=${city}&country=${country}`
    );

    return response.data; // Return unique cities
  } catch (error) {
    console.error("Error fetching cities by country:", error);
    throw error;
  }
};
