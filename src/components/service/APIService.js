import axios from "axios";
import { jwtDecode } from "jwt-decode";
const CryptoJS = require("crypto-js");

const API_URL = "http://localhost:9000/user";

class APIService {
  /** 
  changePassword = async (email, id, newPassword) => {
    try {
      const data = {
        id: id,
        password: newPassword,
      };

      const response = await axios.post(`${API_URL}${email}`, data);

      if (response.status === 200) {
        console.log("Password changed successfully");
        return true; 
      } else {
        console.error("Error changing password:", response);
        return false; 
      }
    } catch (error) {
      console.error("Error changing password:", error);
      throw error; 
    }
  };

  getUserByEmail(email) {
    const token = JSON.parse(sessionStorage.getItem("user")).accessToken;
    return axios.get(`${API_URL}${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updatePatientDetails(user) {
    const token = JSON.parse(sessionStorage.getItem("user")).accessToken;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.put(
        `${API_URL}${user.id}`,
        user,
        { headers }
      );
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Empty response or missing data");
      }
    } catch (error) {
      console.error("Error updating patient details:", error);
      throw error;
    }
  }

  async uploadImageForPatient(user, formData) {
    const token = JSON.parse(sessionStorage.getItem("user")).accessToken;
    try {
      const response = await axios.put(
        `${API_URL}patient/${user.id}/addImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Empty response or missing data");
      }
    } catch (error) {
      console.error("Error uploading doctor image:", error);
      throw error;
    }
  }
    */
  encryptToken(token) {
    try {
      const tokenString = String(token);
      const encryptedToken = CryptoJS.AES.encrypt(
        tokenString,
        process.env.SECRET_KEY || "your-secret-key"
      ).toString();
      return encryptedToken;
    } catch (error) {
      console.error("Encryption Error:", error);
    }
  }

  decryptToken(encryptedToken) {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, process.env.SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        const decodedToken = jwtDecode(response.data.accessToken);
        const user = {
          accessToken: this.encryptToken(response.data.accessToken),
          refreshToken: this.encryptToken(response.data.refreshToken),
          username: decodedToken.username,
        };
        sessionStorage.setItem("user", JSON.stringify(user));
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
      console.log(username);
      console.log("got here!");
      const response = await axios.get(`${API_URL}/users/${username}`);
      return response.data.user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  /** 
  signup(newUser, userType) {
    const headers = {
      "Content-Type": "application/json",
    };

    if (userType === "Doctor") {
      return axios
        .post(`${API_URL}`, newUser, { headers })
        .then((response) => {
          console.log("success", response);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Sign up didn't succeed");
        });
    } else if (userType === "Patient") {
      console.log("it's patient");
      return axios
        .post(`${API_URL}`, newUser, { headers })
        .then((response) => {
          console.log("success", response);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Sign up didn't succeed");
        });
    }
  }
*/
  getRefreshToken() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user ? user.refreshToken : null;
  }
  /** 
  logout() {
    return new Promise((resolve, reject) => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user && user.accessToken && user.refreshToken) {
        sessionStorage.removeItem("user");
        axios
          .post(`${API_URL}/logout`, null, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          })
          .then((response) => {
            console.log("Logged out successfully");
            resolve(response); 
          })
          .catch((error) => {
            console.error("Logout error:", error);
            reject(error);
          });
      } else {
        reject(new Error("User information not found"));
      }
    });
  }
    */
}

const authServiceInstance = new APIService();
export default authServiceInstance;
