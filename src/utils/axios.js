import axios from "axios";

const baseURL = "http://localhost:5000/api/";

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return config;
});

export default instance;
