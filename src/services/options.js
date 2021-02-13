import axios from "axios";

// export const getAllTests = (params) => axios.get("/tests", { params });
// export const getTestById = (testId) => axios.get(`/tests/${testId}`);
export const addOption = (data) => axios.post("/options", data);
export const addOptionsBulk = (data) => axios.post("/options/bulk/add", data);
export const editOptionById = (optionId, data) =>
  axios.put(`/options/${optionId}`, data);
export const editOptionsBulk = (data) => axios.put("/options/bulk/edit", data);
export const deleteOptionById = (optionId) =>
  axios.delete(`/options/${optionId}`);
export const deleteOptionsBulk = (data) =>
  axios.delete("/options/bulk/delete", { data });
// export const editTestById = (testId, data) =>
//   axios.put(`/tests/${testId}`, data);
// export const deleteTestById = (testId) => axios.delete(`/tests/${testId}`);
