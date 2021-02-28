import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const axiosSetup = () => {
  axios.interceptors.request.use((request) => {
    const accessToken = localStorage.getItem("access_token");
    request.baseURL = baseURL;
    request.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(extractError(error));
    },
  );
};

const extractError = ({ response }) => {
  if (!navigator.onLine) {
    return "Network problem!";
  } else {
    if (
      response &&
      response.data &&
      typeof response.data === "object" &&
      typeof response.data.message === "string"
    ) {
      return response.data.message;
    } else if (response && response.data && typeof response.data === "string") {
      return response.data;
    } else {
      return "For some reason the request failed!";
    }
  }
};

export default axiosSetup;
