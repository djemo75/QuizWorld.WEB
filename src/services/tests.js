import axios from "axios";

// Tests
export const getAllTests = (params) => axios.get("/tests", { params });
export const getTestById = (testId) => axios.get(`/tests/${testId}`);
export const getTestByJoinCode = (joinCode) =>
  axios.get("/tests/getByJoinCode", { params: { joinCode } });
export const createTest = (data) => axios.post("/tests", data);
export const editTestById = (testId, data) =>
  axios.put(`/tests/${testId}`, data);
export const deleteTestById = (testId) => axios.delete(`/tests/${testId}`);

// Statistic
export const getTestStatistic = (testId) =>
  axios.get(`/tests/${testId}/statistic`);

// Solving test
export const solveTestById = (testId, data) =>
  axios.post(`/testResults/${testId}`, data);

// Test results
export const getMyResults = (params) =>
  axios.get("/testResults/me", { params });
export const getTestResultsById = (testId, params) =>
  axios.get(`/testResults/${testId}`, { params });
export const getTestResultByResultId = (testId, resultId) =>
  axios.get(`/testResults/${testId}/result/${resultId}`);
export const deleteTestResultByResultId = (testId, resultId) =>
  axios.delete(`/testResults/${testId}/result/${resultId}`);

// Test participants
export const getTestParticipantsById = (testId, params) =>
  axios.get(`/tests/${testId}/participants`, { params });
export const addParticipant = (testId, data) =>
  axios.post(`/tests/${testId}/participants`, data);
export const removeParticipant = (testId, participantId) =>
  axios.delete(`/tests/${testId}/participants/${participantId}`);
