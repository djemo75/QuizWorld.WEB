export const extractError = (e) => {
  if (!navigator.onLine) {
    return "Network problem!";
  } else {
    return e?.response?.data?.message || "For some reason the request failed!";
  }
};
