import React, { useEffect, useState } from "react";
import styles from "./Post.module.css";
import image from "../assets/soldier.jpeg";
import Comment from "./Comment";
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
import authServiceInstance from "./service/APIService";

export default function Post() {
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState();
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % post.photos.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + post.photos.length) % post.photos.length);
  };

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };
  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const post = await authServiceInstance.getPost(postId);
        setPost(post);
        setLikes(post.likes);
        setComments(post.comments);
      } catch (error) {
        console.log("error while trying to fetch post: ", error);
      }
    };
    fetchPost();
  }, [post]);

  if (!post) {
    return <div>FETCHING POST</div>;
  }
  return (
    <div>
      <div className={styles.searchWrapper}>
        <SearchBar className={styles.searchBar} />
      </div>
      <div className={styles.fullscreenCardWrapper}>
        <div className={styles.fullscreenCard}>
          {/*LEFT SIDE*/}
          <div className={styles.carousel}>
            <button className={styles.arrow} onClick={prev}>
              ←
            </button>

            <div className={styles.imageContainer}>
              <img
                src={post.photos[index].image}
                alt={`photo ${index}`}
                className={styles.image}
              />
            </div>

            <button className={styles.arrow} onClick={next}>
              →
            </button>

            <div className={styles.pagination}>
              {post.photos.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${
                    i === index ? styles.active : ""
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            className={`${styles.heartButton} ${liked ? styles.liked : ""}`}
            onClick={toggleLike}
          >
            ❤️
          </button>
          <div className={styles.likes}>{likes}</div>
          {/*RIGHT SIDE*/}
          <div className={styles.rightSide}>
            <div className={styles.authorWrapper}>
              <div className={styles.author}>NAME</div>
              <small className={styles.description}>
                Under the warm golden light of the setting sun, the small town
                came alive with a quiet, almost magical energy. Under the warm
                golden light of the setting sun, the small town came alive with
                a quiet, almost magical energy. Under the warm golden light of
                the setting sun, the small town came alive with a quiet, almost
                magical energy.
              </small>
            </div>
            <div>
              <input
                className={styles.newComment}
                type="text"
                placeholder="comment to the soldier"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className={styles.sendButton}> שגר</button>
            </div>
            {comments.map((comment, index) => {
              console.log(comment);
              return (
                <Comment
                  key={index}
                  comment={comment}
                  className={styles.comment}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
