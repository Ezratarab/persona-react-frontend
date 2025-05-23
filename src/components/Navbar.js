import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/gold_chip.png";

export default function NavBar() {
  const [isLogin, setIsLogin] = useState(false); // This should eventually come from auth state
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    //setIsLogin(false);
    //navigate("/logout");
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.logo} onClick={() => navigate("/home")}>
        <img src={logo} alt="App Logo" className={styles.logoImage} />
      </div>

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
