import axios from "axios";
import { appRoutes } from "../../constant/constant";

export const getBatches = async () => {
    try {
      const response = await axios.get(
        `${appRoutes.getBranches}}`
      );
      return response.data;
    } catch (error) {
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