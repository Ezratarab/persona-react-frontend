import React from "react";
import styles from "./Home.module.css";
import { motion } from "framer-motion";

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
      <div className={styles.projName}>persona</div>
      <div className={styles.welcome}>
        <motion.h1
          initial={{ opacity: 0, y: -50 }} // Initial state (hidden and above)
          animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
          transition={{ duration: 5, ease: "easeOut" }} // Animation duration and easing
          style={{ fontSize: "2rem" }}
        >
          Hi, how are you?
        </motion.h1>
      </div>
      
    </div>
  );
}
