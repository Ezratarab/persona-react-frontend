import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./service/AuthContext";

function SearchBar({ className }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const username = e.target.value.trim();
      if (!username) {
        setError("Please enter a username");
        return;
      }
      setError(null);
      console.log("You searched for:", username);
      navigate(`/profile/${username}`);
    }
  };
  if (!user) return null;
  return (
    <div className={`${styles.searchBar} ${className}`}>
      <input type="text" placeholder="Search user" onKeyDown={handleKeyDown} />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default SearchBar;
