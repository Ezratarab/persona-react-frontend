import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axiosInstance.js";

const API_URL = process.env.REACT_APP_API_URL;

class APIService {
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

        return response.data;
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        console.log(error.response.data.message);
        return error;
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
  async blobUrlToFile(blobUrl, filename) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  }

  async post(username, images, description, location) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("description", description ?? "");
    formData.append("location", location ?? "");
    const files = await Promise.all(
      images.map((blobUrl, i) => this.blobUrlToFile(blobUrl, `image_${i}.jpg`))
    );
    files.forEach((file) => formData.append("photos", file));

    const response = await axiosInstance.post(`${API_URL}/post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  }
  async getPost(postId) {
    const response = await axiosInstance.get(`${API_URL}/post/${postId}`);
    return response.data.post;
  }
}

const authServiceInstance = new APIService();
export default authServiceInstance;
