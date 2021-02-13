import axios from "axios";

export const getProfileRequest = () => axios.get("/users/profile");
export const getAllUsers = (params) => axios.get("/users", { params });
