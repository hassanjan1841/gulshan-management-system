import { get } from "react-hook-form";

const prodUrl = import.meta.env.VITE_PROD_URL;
const devUrl = import.meta.env.VITE_DEV_URL;
const apiUrl = import.meta.env.VITE_API_URL;
const BASE_URL = apiUrl;

export const appRoutes = {
  login: BASE_URL + "auth/login",
  getUsers: BASE_URL + "user",
  getSingleUser: BASE_URL + "user/me",
  createUser: BASE_URL + "user",
  updateUser: BASE_URL + "user",
  deleteUser: BASE_URL + "user",
  getCoursesForStudent: BASE_URL + "user/course",

  getCourses: BASE_URL + "course",
  getSingleCourse: BASE_URL + "course",
  createCourse: BASE_URL + "course",
  updateCourse: BASE_URL + "course",
  deleteCourse: BASE_URL + "course",

  getBatches: BASE_URL + "batch",
  getSingleBatch: BASE_URL + "batch",
  createBatch: BASE_URL + "batch",
  updateBatch: BASE_URL + "batch",
  deleteBatch: BASE_URL + "batch",
  getBatchesByCourseId: BASE_URL + "batch/course",

  getSections: BASE_URL + "section",
  getTeacherSections: BASE_URL + "section/teacher",
  getSingleSection: BASE_URL + "section",
  updateSection: BASE_URL + "section",
  deleteSection: BASE_URL + "section",
  createSection: BASE_URL + "section",

  sendEmail: BASE_URL + "sendEmail",
  scheduleEmails: BASE_URL + "sendEmail/schedule",

  // Branch Routes
  getBranches: BASE_URL + "branch", // Get all branches
  getSingleBranch: BASE_URL + "branch", // Get a single branch by ID
  createBranch: BASE_URL + "branch", // Create a new branch
  updateBranch: BASE_URL + "branch", // Update a branch by ID
  deleteBranch: BASE_URL + "branch", // Delete a branch by ID
  getBranchesByCourseId: BASE_URL + "branch/course", // Get branches by course ID
  getBranchesByCountryCityAndCourse: BASE_URL + "branch", // Get branches by country, city, and course
  getBranchesByCityAndCountry: BASE_URL + "branch", // Get branches by city and country
  getAllCountriesFromBranchWithAdmissionOpen:
    BASE_URL + "branch?admissionOpen=true", // Get countries where branches have open admission
  getAllCitiesByCountryForBranches: BASE_URL + "branch?country=", // Get cities by country for branches

  //Assignment Route
  createAssignment: BASE_URL + "assignment",
  getAssignments: BASE_URL + "assignment",
  deleteAssignment: BASE_URL + "assignment",
  updateAssignment: BASE_URL + "assignment",

  //assignment submission routes
  createAssignmentSubmission: BASE_URL + "assignment-submission",
  getAssignmentSubmissions: BASE_URL + "assignment-submission",
  deleteAssignmentSubmission: BASE_URL + "assignment-submission",
  updateAssignmentSubmission: BASE_URL + "assignment-submission",

  //Quiz Routes
  getQuizzes: BASE_URL + "main-quiz",
  getSingleQuiz: BASE_URL + "main-quiz",
  createQuiz: BASE_URL + "main-quiz",
  updateQuiz: BASE_URL + "main-quiz",
  deleteQuiz: BASE_URL + "main-quiz",

  //Quiz Question Routes
  getQuizzesByCourseAndBatch: BASE_URL + "main-quiz",
  createQuizQuestion: BASE_URL + "main-quiz/question",
  deleteQuizQuestion: BASE_URL + "main-quiz/question",
  updateQuizQuestion: BASE_URL + "main-quiz/question",
  getQuestionsFromQuiz: (quizId) => `${BASE_URL}main-quiz/${quizId}/questions`,
  updateQuizActiveStatus: BASE_URL + "main-quiz",
  addQuestionToQuiz: (quizId) => `${BASE_URL}main-quiz/${quizId}/questions`,
  deleteQuestionFromQuiz: (quizId, questionId) =>
    `${BASE_URL}main-quiz/${quizId}/questions/${questionId}`,
};
