import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      window.location.href = "/login";
      return Promise.reject("User redirected to login due to no access token");
    }
  }
  console.log(API_URL);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    {
      const authHeader = response.headers["authorization"];
      if (authHeader?.startsWith("Bearer ")) {
        const newToken = authHeader.split(" ")[1];
        localStorage.setItem("accessToken", newToken);
      }
    }
    return response;
  },
  async (error) => {
    console.log("got error: ", error);
    if (
      error.response &&
      error.response.data?.message ===
        process.env.REACT_APP_REFRESH_TOKEN_EXPIRED
    ) {
      window.dispatchEvent(new Event("logout"));
      return Promise.reject(
        "User redirected to login due to expired refresh token"
      );
    }
    if (
      error.response &&
      error.response.data?.message ===
        process.env.REACT_APP_REFRESH_TOKEN_NOT_FOUND
    ) {
      window.dispatchEvent(new Event("logout"));
      return Promise.reject("User redirected to login due to no refresh token");
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
