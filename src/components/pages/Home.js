import React from "react";
import styles from "./Home.module.css";
import { motion } from "framer-motion";
import SearchBar from "../SearchBar";

export default function Home() {
  return (
    <div className={styles.home}>
      <video autoPlay muted loop className={styles.videoBackground}>
        <source
          src={require("../../assets/background-video2.mp4")}
          type="video/mp4"
        />{" "}
        Your browser does not support the video tag.
      </video>
      <div className={styles.welcome}>
        <motion.h1
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 5, ease: "easeOut" }} 
          style={{ fontSize: "2rem" }}
        >
          Hi, how are you?
        </motion.h1>
      </div>
    </div>
  );
}
