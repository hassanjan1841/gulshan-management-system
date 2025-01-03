import axios from "axios";
import { appRoutes } from "../../constant/constant";

export const getCourses = async (page, limit) => {
  try {
    const response = await axios.get(
      `${appRoutes.getCourses}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getSingleCourse = async (id) => {
  try {
    const response = await axios.get(`${appRoutes.getSingleCourse}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createCourse = async (course, token) => {
  try {
    const response = await axios.post(
      appRoutes.createCourse,
      course,
      token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateCourse = async (course) => {
  try {
    const response = await axios.put(appRoutes.updateCourse, course);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(`${appRoutes.deleteCourse}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
