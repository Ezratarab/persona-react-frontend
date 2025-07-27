import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import ReactCardFlip from "react-card-flip";
import { FaSyncAlt } from "react-icons/fa";
import defaultImage from "../../assets/soldier.jpeg";
import SearchBar from "../SearchBar";
import Post from "../Post";
import { useParams } from "react-router-dom";
import authServiceInstance from "../../components/service/APIService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../service/AuthContext";

export default function Profile() {
  const [isFlipped, setIsFlipped] = useState(false);
  const { username } = useParams();
  const [fullUser, setFullUser] = useState(null);
  const [isSameUser, setIsSameUser] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (username) {
      const fetchUser = async () => {
        try {
          const fetchedUser = await authServiceInstance.getUser(username);
          console.log("Fetched user:", fetchedUser);
          setFullUser(fetchedUser);
          user === fetchedUser.username
            ? setIsSameUser(true)
            : setIsSameUser(false);
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      };

      fetchUser();
    }
  }, [username]);

  const handleFlip = () => setIsFlipped(!isFlipped);
  if (!user) {
    return <div className={styles.loading}>Loading profile...</div>;
  }
  if (!fullUser || !fullUser.posts) {
    return <p>Loading posts...</p>;
  }
  return (
    <div className={styles.profileContainer}>
      <div className={styles.fullscreenCardWrapper}>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          {/* Front Side */}

          <div className={styles.fullscreenCard} onClick={handleFlip}>
            <img
              src={fullUser?.profilePhoto || defaultImage}
              alt={`${fullUser?.username || "User"}'s profile`}
              className={styles.image}
            />
            {isSameUser && (
              <button
                className={styles.addPost}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/addPost");
                }}
              >
                Add Post
              </button>
            )}
            <div className={styles.name}>{fullUser.username}</div>

            <div className={styles.information}>
              <div className={styles.infoItem}>
                <small>Unit</small>
                <p>{fullUser.unit}</p>
              </div>
              <div className={styles.infoItem}>
                <small>Team</small>
                <p>{fullUser.team}</p>
              </div>
              <div className={styles.infoItem}>
                <small>Release Day</small>
                <p>{fullUser.releaseDay}</p>
              </div>
              <div className={styles.infoItem}>
                <small>Role</small>
                <p>{fullUser.role}</p>
              </div>
              <div className={styles.infoItem}>
                <small>Gender</small>
                <p>{fullUser.gender}</p>
              </div>
              <div className={styles.sentence}>{fullUser.bio}</div>
            </div>
          </div>

          {/* Back Side */}
          <div className={styles.fullscreenCard} onClick={handleFlip}>
            <div className={styles.posts}>
              {fullUser?.posts?.length > 0 ? (
                fullUser.posts.map((post, index) => {
                  const firstPhoto = post.photos?.[0];
                  const postId = post._id;
                  return firstPhoto ? (
                    <img
                      key={index}
                      src={firstPhoto}
                      alt={`Post ${index} photo`}
                      className={styles.post}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/post/${postId}`);
                      }}
                    />
                  ) : null;
                })
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
