import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/gold_chip.png";
import authServiceInstance from "../components/service/APIService";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const [isLogin, setIsLogin] = useState(false);
  const [atHome, setIsAtHome] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    setIsLogin(true);
    navigate("/login");
  };

  const handleLogout = async () => {
    setIsLogin(false);
    await authServiceInstance.logout();
    navigate("/home");
  };
  useEffect(() => {
    if (location.pathname === "/home") {
      setIsAtHome(true);
    } else {
      setIsAtHome(false);
    }
  }, [location]);

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
        {isLogin ? (
          <a href="#" onClick={handleLogout}>
            Log-Out
          </a>
        ) : (
          <a href="#" onClick={handleLogin}>
            Log-In
          </a>
        )}
      </div>
    </div>
  );
}
