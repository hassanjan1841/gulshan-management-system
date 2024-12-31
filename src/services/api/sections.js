import axios from "axios";
import { appRoutes } from "../../constant/constant";

export const getSections = async (batch) => {
  try {
    const response = await axios.get(
      `${appRoutes.getSections}?batch=${batch}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw error;
  }
};