import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.name);
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("accessToken");
        setUser(null);
      }
    }
    setLoading(false);
  }, [user]);
  useEffect(() => {
    const logoutHandler = () => {
      localStorage.removeItem("accessToken");
    };

    window.addEventListener("logout", logoutHandler);

    return () => {
      window.removeEventListener("logout", logoutHandler);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
