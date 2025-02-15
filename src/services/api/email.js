import axios from "axios";
import { appRoutes } from "../../constant/constant";

export const sendEmail = async (emailObj) => {
    try {
        console.log("email obj in sendEmail>>", emailObj); 
      const response = await axios.post(
        appRoutes.sendEmail, emailObj,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating batch:", error);
      throw error;
    }
  };