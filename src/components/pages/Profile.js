import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import ReactCardFlip from "react-card-flip";
import { FaSyncAlt } from "react-icons/fa";
import defaultImage from "../../assets/soldier.jpeg";
import SearchBar from "../SearchBar";
import Post from "../Post";
import { useParams } from "react-router-dom";
import authServiceInstance from "../../components/service/APIService";

export default function Profile() {
  const [isFlipped, setIsFlipped] = useState(false);
  const { username } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("hiiiiiiiiiiiiiii");
    if (username) {
      const fetchUser = async () => {
        try {
          const fetchedUser = await authServiceInstance.getUser(username);
          console.log("Fetched user:", fetchedUser);
          setUser(fetchedUser);
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      };

      fetchUser();
    }
  }, [username]);

  const handleFlip = () => setIsFlipped(!isFlipped);
  if (!user) {
    console.log("wait");
    return <div className={styles.loading}>Loading profile...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.searchWrapper}>
        <SearchBar className={styles.searchBar} />
      </div>
      <div className={styles.fullscreenCardWrapper}>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          {/* Front Side */}

          <div className={styles.fullscreenCard} onClick={handleFlip}>
            <img
              src={user?.profilePhoto || defaultImage}
              alt={`${user?.username || "User"}'s profile`}
              className={styles.image}
            />
            <div className={styles.name}>{user.username}</div>

            <div className={styles.information}>
              <div className={styles.infoItem}>
                <small>Unit</small>
                <p>{user.unit}</p>
              </div>
              <div className={styles.infoItem}>
                <small>Team</small>
                <p>{user.team}</p>
              </div>
              <div className={styles.infoItem}>
                <small>Release Day</small>
                <p>{user.releaseDay}</p>
              </div>
              <div className={styles.infoItem}>
                <small>Role</small>
                <p>{user.role}</p>
              </div>
              <div className={styles.infoItem}>
                <small>Gender</small>
                <p>{user.gender}</p>
              </div>
              <div className={styles.sentence}>{user.bio}</div>
            </div>
          </div>

          {/* Back Side */}
          <div className={styles.fullscreenCard} onClick={handleFlip}>
            <div className={styles.posts}>
              {user?.posts?.length > 0 ? (
                user.posts.map((post, index) => (
                  <img key={index} src={post.image} className={styles.post} />
                ))
              ) : (
                <p>No posts to show</p>
              )}
            </div>
          </div>
        </ReactCardFlip>
      </div>
    </div>
  );
}
