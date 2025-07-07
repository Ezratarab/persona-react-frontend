import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axiosInstance.js";

const API_URL = process.env.REACT_APP_API_URL;

class APIService {
  parseJwt(token) {
    const base64Url = token.split(".")[1]; // get payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  async login(username, password) {
    console.log(API_URL);
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { username, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Login successful");

        const accessToken = response.headers["authorization"]?.split(" ")[1];
        console.log(response);
        if (!accessToken) {
          throw new Error("Didnt get accessToken!");
        }
        localStorage.setItem("accessToken", accessToken);

        return this.parseJwt(accessToken);
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        console.log(error.response?.data?.message);
        throw new Error(error.response?.data?.message || "Login failed");
      } else if (error.request) {
        return { error: "No response from server. Please try again later." };
      } else {
        return { error: "An unexpected error occurred." };
      }
    }
  }

  async getUser(username) {
    const response = await axiosInstance.get(`/users/${username}`);
    return response.data.user;
  }
  async getAllUsers() {
    const response = await axiosInstance.get(`/allUsers`);
    return response.data;
  }
  async logout() {
    const response = await axiosInstance.post(`/logout`);
    localStorage.removeItem("accessToken");
    return response;
  }
  async getUserByEmail(email) {
    const response = await axiosInstance.get(`${API_URL}/user/${email}`);
    return response.data.user;
  }
  async blobUrlToBase64(blobUrl) {
    return fetch(blobUrl)
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result); // result is the base64 string (with mime)
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  }

  async post(images, description, location) {
    const base64Images = await Promise.all(
      images.map((blobUrl) => this.blobUrlToBase64(blobUrl))
    );

    const payload = {
      description: description ?? "",
      location: location ?? "",
      photos: base64Images,
    };

    const response = await axiosInstance.post(`${API_URL}/post`, payload);
    console.log(response);
    return response;
  }

  async getPost(postId) {
    const response = await axiosInstance.get(`${API_URL}/post/${postId}`);
    return response.data.post;
  }
  async likePost(postId) {
    const response = await axiosInstance.post(`${API_URL}/post/${postId}/like`);
    return response.data.post;
  }
}

const authServiceInstance = new APIService();
export default authServiceInstance;
