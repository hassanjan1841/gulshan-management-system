import axios from "axios";
import { appRoutes } from "../../constant/constant";

export const createAssignment = async (assignment) => {
    console.log("assignment in createAssignment", assignment);
    try {
      const response = await axios.post(
        appRoutes.createAssignment,assignment
    );
      return response.data;
    } catch (error) {
      console.error("Error creating batch:", error);
      throw error;
    }
  };

  export const getAssignments = async (page, limit, section) => {
    try {
      const response = await axios.get(
        `${appRoutes.getAssignments}?page=${page}&limit=${limit}${
          section && "&section=" + section
        }`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };