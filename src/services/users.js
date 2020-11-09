import axios from "../utils/axios";

export const getProfileRequest = () => axios.get("/profile");
