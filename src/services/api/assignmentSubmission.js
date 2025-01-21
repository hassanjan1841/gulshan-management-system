import axios from "axios";
import { appRoutes } from "../../constant/constant";

export const createAssignmentSubmission = async (submission) => {
  console.log("submission in createAssignmentSubmission", submission);
  try {
    const response = await axios.post(
      appRoutes.createAssignmentSubmission,
      submission
    );
    return response.data;
  } catch (error) {
    console.error("Error creating assignment submission:", error);
    throw error;
  }
};

export const getAssignmentSubmissions = async (page, limit, assignmentId) => {
  try {
    const response = await axios.get(
      `${appRoutes.getAssignmentSubmissions}?page=${page}&limit=${limit}${
        assignmentId && "&assignmentId=" + assignmentId
      }`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAssignmentSubmission = async (submissionId) => {
  try {
    const response = await axios.delete(
      `${appRoutes.deleteAssignmentSubmission}/${submissionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting assignment submission:", error);
    throw error;
  }
};

export const updateAssignmentSubmission = async (
  submissionId,
  updatedSubmission
) => {
  try {
    const response = await axios.put(
      `${appRoutes.updateAssignmentSubmission}/${submissionId}`,
      updatedSubmission
    );
    return response.data;
  } catch (error) {
    console.error("Error updating assignment submission:", error);
    throw error;
  }
};
