import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/gold_chip.png";

export default function NavBar() {
  const [isLogin] = useState(false); // Simplified for now
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.navBar}>
        <div className={styles.logo}>
          <Link to="/home">
            <img src={logo} alt="App Logo" className={styles.logoImage} />
          </Link>
        </div>
        <div className={styles.login}>
          {isLogin ? (
            <>
              <Link to="/logout">Log-Out</Link>
              <p>Hi </p>
            </>
          ) : (
            <>
              <Link to="/login">Log-In</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
