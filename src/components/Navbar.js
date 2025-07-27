import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/gold_chip.png";
import authServiceInstance from "../components/service/APIService";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "./service/AuthContext";

export default function NavBar() {
  const [atHome, setIsAtHome] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuth();

  const handleLoginLogout = async () => {
    if (user) {
      await authServiceInstance.logout();
      setUser(null);
      navigate("/home");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (location.pathname === "/home") {
      setIsAtHome(true);
    } else {
      setIsAtHome(false);
    }
    console.log("now user::::,", user);
  }, [location, user]);

  return (
    <div className={styles.navBar}>
      <div className={styles.logo} onClick={() => navigate("/home")}>
        <img src={logo} alt="App Logo" className={styles.logoImage} />
      </div>
      {atHome ? (
        <div className={styles.projName}>persona</div>
      ) : (
        <div className={styles.searchWrapper}>
          <SearchBar className={styles.searchBar} />
        </div>
      )}

      <div className={styles.login}>
        {user ? (
          <a href="#" onClick={handleLoginLogout}>
            Log-Out
          </a>
        ) : (
          <a href="#" onClick={handleLoginLogout}>
            Log-In
          </a>
        )}
      </div>
    </div>
  );
}
