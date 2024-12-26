import axios from "axios";
import { appRoutes } from "../../constant/constant";

export const getCourses = async (course, page, pageSize) => {
    try {
      const response = await axios.get(`${appRoutes.getCourses}?course=${course}&page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };
export const createCourse = async (data) => {
    try {
      const response = await axios.post(appRoutes.createCourse, data);
      console.log("response in createCourses", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };