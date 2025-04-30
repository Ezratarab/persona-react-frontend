import React, { useState } from "react";
import styles from "./Profile.module.css";
import ReactCardFlip from "react-card-flip";
import { FaSyncAlt } from "react-icons/fa";
import image from "../../assets/soldier.jpeg";
import SearchBar from "../SearchBar";
import Post from "../Post";

export default function Profile() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);
  const posts = [
    { text: "Post 1", image: image },
    { text: "Post 2", image: image },
    { text: "Post 3", image: image },
    { text: "Post 4", image: image },
    { text: "Post 5", image: image },
    { text: "Post 5", image: image },
    { text: "Post 5", image: image },
    { text: "Post 5", image: image },
    { text: "Post 5", image: image },
    // ... keep going
  ];  

  const handleSearch = (query) => {
    console.log("You searched for:", query);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.searchWrapper}>
        <SearchBar className={styles.searchBar} onSearch={handleSearch} />
      </div>

      <div className={styles.fullscreenCardWrapper}>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          {/* Front Side */}
          <div className={styles.fullscreenCard} onClick={handleFlip}>
            <img src={image} className={styles.image} />
            <div className={styles.name}>NAME</div>

            <div className={styles.information}>
              <div className={styles.infoItem}>
                <small>Unit</small>
                <p>Paratroopers</p>
              </div>
              <div className={styles.infoItem}>
                <small>Team</small>
                <p>Alpha</p>
              </div>
              <div className={styles.infoItem}>
                <small>IDF ID</small>
                <p>1234567</p>
              </div>
              <div className={styles.infoItem}>
                <small>Release Day</small>
                <p>01/01/2026</p>
              </div>
              <div className={styles.infoItem}>
                <small>Type</small>
                <p>Combat</p>
              </div>
              <div className={styles.infoItem}>
                <small>Gender</small>
                <p>Male</p>
              </div>
              <div className={styles.sentence}>The end is near</div>
            </div>
          </div>

          {/* Back Side */}
          <div className={styles.fullscreenCard} onClick={handleFlip}>
            <div className={styles.posts}>
              {posts.map((post, index) => (
                <img key={index} src={post.image} className={styles.post} />
              ))}
            </div>
          </div>
        </ReactCardFlip>
      </div>
    </div>
  );
}
