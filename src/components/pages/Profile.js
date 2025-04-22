import React, { useState } from "react";
import styles from "./Profile.module.css";
import ReactCardFlip from "react-card-flip";
import { FaSyncAlt } from "react-icons/fa";
import image from "../../assets/soldier.jpeg";

export default function Profile() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);
  const images = [image, image, image, image, image, image,image,image,image];
  return (
    <div className={styles.fullscreenCardWrapper}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* FRONT SIDE */}
        <div className={styles.fullscreenCard} onClick={handleFlip}>
          <img src={image} className={styles.image}></img>
          <div className={styles.name}>NAME</div>
        </div>

        {/* BACK SIDE */}
        <div className={styles.fullscreenCard} onClick={handleFlip}>
          <div className={styles.posts}>
            {images.map((src, index) => (
              <img key={index} src={src} className={styles.post} />
            ))}
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}
