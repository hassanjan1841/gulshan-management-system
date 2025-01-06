import axios from "axios";
import { appRoutes } from "../../constant/constant";

export const getBatches = async (course, page, limit) => {
  try {
    const response = await axios.get(
      `${appRoutes.getBatches}?course=${course}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleBatch = async (id) => {
  try {
    const response = await axios.get(`${appRoutes.getSingleBatch}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching batch:", error);
    throw error;
  }
};

export const createBatch = async (batch, token) => {
  try {
    const response = await axios.post(
      appRoutes.createBatch,
      batch,
      token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating batch:", error);
    throw error;
  }
};

export const updateBatch = async (batch) => {
  try {
    const response = await axios.put(appRoutes.updateBatch, batch);
    return response.data;
  } catch (error) {
    console.error("Error updating batch:", error);
    throw error;
  }
};

export const deleteBatch = async (id) => {
  try {
    const response = await axios.delete(`${appRoutes.deleteBatch}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting batch:", error);
    throw error;
  }
};

export const getBatchesByCourseId = async (courseId) => {
  try {
    const response = await axios.get(
      `${appRoutes.getBatchesByCourseId}/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching batch by course ID:", error);
    throw error;
  }
};
export const getAllCountriesFromBatchWithAdmissionOpen = async () => {
  try {
    const response = await axios.get(
      `${appRoutes.getBatches}?admissionOpen=true`
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
      `${appRoutes.getBatches}?country=${country}`
    );

    return response.data; // Return unique cities
  } catch (error) {
    console.error("Error fetching cities by country:", error);
    throw error;
  }
};

export const getCoursesByCityAndCountry = async (city, country) => {
  try {
    const response = await axios.get(
      `${appRoutes.getBatches}?city=${city}&country=${country}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getBranchesByCountryCityAndCourse = async (
  country,
  city,
  course
) => {
  try {
    const response = await axios.get(
      `${appRoutes.getBatches}?country=${country}&city=${city}&course=${course}&admissionOpen=true`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching branches by country, city, and course:",
      error
    );
    throw error;
  }
};
