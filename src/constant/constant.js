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
};
