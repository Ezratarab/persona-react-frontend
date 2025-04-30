import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ className, onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch?.(searchValue);
    }
  };
  return (
    <input
      className={`${styles.searchBar} ${className}`}
      type="text"
      placeholder="search here"
      value={searchValue}
      maxLength={20}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyDown={handleKeyDown}
    ></input>
  );
}

export default SearchBar;
