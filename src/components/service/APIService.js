import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:9000/user";

class APIService {
  extractAccessToken() {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
  }
  updateAccessToken(response){
    const newAccessToken = response.headers["authorization"];
    if (newAccessToken?.startsWith("Bearer ")) {
      const token = newAccessToken.split(" ")[1];
      localStorage.setItem("accessToken", token);
      console.log("Updated access token:", token);
    }
  }
  async login(username, password) {
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
    try {
      const accessToken = this.extractAccessToken();
      console.log("previos:", accessToken);
      console.log("FRONT trying to get: ", username);
      const response = await axios.get(`${API_URL}/users/${username}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      this.updateAccessToken(response);

      return response.data.user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const accessToken = this.extractAccessToken();
      const response = await axios.get(`${API_URL}/user/${email}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      this.updateAccessToken(response);

      return response.data;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
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
