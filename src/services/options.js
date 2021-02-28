import axios from "axios";

export const addOptionsBulk = (data) => axios.post("/options/bulk/add", data);
export const editOptionsBulk = (data) => axios.put("/options/bulk/edit", data);
export const deleteOptionsBulk = (data) =>
  axios.delete("/options/bulk/delete", { data });
