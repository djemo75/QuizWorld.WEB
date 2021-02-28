import axios from "axios";

export const getQuestionsWithOptionsWithAnswersByTestId = (testId) =>
  axios.get(`/tests/${testId}/questionsWithOptionsWithAnswers`);
export const getQuestionsWithOptionsByTestId = (testId) =>
  axios.get(`/tests/${testId}/questionsWithOptions`);
export const addQuestion = (data) => axios.post("/questions", data);
export const editQuestionById = (questionId, data) =>
  axios.put(`/questions/${questionId}`, data);
export const deleteQuestionById = (questionId) =>
  axios.delete(`/questions/${questionId}`);
