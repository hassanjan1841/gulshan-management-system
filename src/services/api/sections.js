import axios from "axios";
import { appRoutes } from "../../constant/constant";

export const getSections = async (page, limit, batch) => {
  try {
    const response = await axios.get(
      `${appRoutes.getSections}?page=${page}&limit=${limit}&batch=${batch}`
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

// Create a new section
export const createSection = async (sectionData) => {
  try {
    const response = await axios.post(appRoutes.createSection, sectionData);
    return response.data;
  } catch (error) {
    console.error("Error creating section:", error);
    throw error;
  }
};

// Update a section by ID
export const updateSection = async (id, sectionData) => {
  try {
    const response = await axios.put(
      `${appRoutes.updateSection}/${id}`,
      sectionData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating section with ID ${id}:`, error);
    throw error;
  }
};

// Delete a section by ID
export const deleteSection = async (id) => {
  try {
    const response = await axios.delete(`${appRoutes.deleteSection}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting section with ID ${id}:`, error);
    throw error;
  }
};

export const getTeacherSections = async (teacherId) => {
  try {
    const response = await axios.get(
      `${appRoutes.getTeacherSections}?teacher=${teacherId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw error;
  }
};
