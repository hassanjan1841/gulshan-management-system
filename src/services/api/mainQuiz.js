import axios from "axios";
import { appRoutes } from "../../constant/constant";

export const getQuizzes = async () => {
  try {
    const response = await axios.get(appRoutes.getQuizzes);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

export const getSingleQuiz = async (id) => {
  try {
    const response = await axios.get(`${appRoutes.getSingleQuiz}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};

export const createQuiz = async (quiz, token) => {
  try {
    const response = await axios.post(
      appRoutes.createQuiz,
      quiz,
      token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export const updateQuiz = async (id, quiz) => {
  try {
    const response = await axios.put(`${appRoutes.updateQuiz}/${id}`, quiz);
    return response.data;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

export const deleteQuiz = async (id) => {
  try {
    const response = await axios.delete(`${appRoutes.deleteQuiz}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

// New functions for handling questions within a quiz

export const getAllQuestionsFromQuiz = async (quizId) => {
  try {
    console.log(appRoutes.getQuestionsFromQuiz(quizId));
    // const response = await axios.get(
    //   `${appRoutes.getAllQuestionsFromQuiz}/${quizId}`
    // );
    // return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const getQuestionFromQuiz = async (quizId, questionId) => {
  try {
    const response = await axios.get(
      `${appRoutes.getQuestionFromQuiz}/${quizId}/${questionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};

export const addQuestionToQuiz = async (quizId, question, token) => {
  try {
    const response = await axios.post(
      `${appRoutes.addQuestionToQuiz}/${quizId}`,
      question,
      token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding question:", error);
    throw error;
  }
};

export const updateQuestionInQuiz = async (quizId, questionId, question) => {
  try {
    const response = await axios.put(
      `${appRoutes.updateQuestionInQuiz}/${quizId}/${questionId}`,
      question
    );
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

export const deleteQuestionFromQuiz = async (quizId, questionId) => {
  try {
    const response = await axios.delete(
      `${appRoutes.deleteQuestionFromQuiz}/${quizId}/${questionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

export const getQuizzesByCourseAndBatch = async (courseId, batchId) => {
  try {
    const response = await axios.get(
      `${appRoutes.getQuizzesByCourseAndBatch}?courseId=${courseId}&batchId=${batchId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes by course and batch:", error);
    throw error;
  }
};

export const updateQuizActiveStatus = async (id, active) => {
  try {
    console.log("updateQuizActiveStatus", id, active);
    const response = await axios.put(
      `${appRoutes.updateQuizActiveStatus}/${id}`,
      {active}
    );
    return response.data;
  } catch (error) {
    console.error("Error updating quiz active status:", error);
    throw error;
  }
};
