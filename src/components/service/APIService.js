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

  async getUserByEmail(email) {
    const response = await axios.get(`${API_URL}/user/${email}`);
    return response.data.user;
  }

  async logout() {
    try {
      const accessToken = this.extractAccessToken();
      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }
}

const authServiceInstance = new APIService();
export default authServiceInstance;
