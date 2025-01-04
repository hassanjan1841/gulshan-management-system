import axios from "axios";
import { appRoutes } from "../../constant/constant";

export const getSections = async (batch) => {
  try {
    const response = await axios.get(
      `${appRoutes.getSections}?batch=${!batch ? "" : batch}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw error;
  }
};

// Get a single user by ID
export const getSectionById = async (id) => {
  try {
    const response = await axios.get(`${appRoutes.getSingleSection}/${id}`);
    console.log("respones in get section by id d", response);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID}:`, error);
    throw error;
  }
};
