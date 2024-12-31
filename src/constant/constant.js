import { get } from "react-hook-form";

const prodUrl = import.meta.env.VITE_PROD_URL;
const devUrl = import.meta.env.VITE_DEV_URL;
const BASE_URL = devUrl;

export const appRoutes = {
  login: BASE_URL + "auth/login",
  getUsers: BASE_URL + "user",
  getSingleUser: BASE_URL + "user/me",
  createUser: BASE_URL + "user",
  updateUser: BASE_URL + "user",
  deleteUser: BASE_URL + "user",
  getCourses: BASE_URL + "course",
  getSingleCourse: BASE_URL + "course",
  createCourse: BASE_URL + "course",
  updateCourse: BASE_URL + "course",
  getBatches: BASE_URL + "batch",
  getSingleBatch: BASE_URL + "batch",
  createBatch: BASE_URL + "batch",
  updateBatch: BASE_URL + "batch",
  deleteBatch: BASE_URL + "batch",
  getBatchesByCourseId: BASE_URL + "batch/course",
  getSections: BASE_URL + 'section'
};
