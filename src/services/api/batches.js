import axios from "axios";
import { appRoutes } from "../../constant/constant";

export const getBatches = async (course,page, limit) => {
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
