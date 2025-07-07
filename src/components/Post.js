import React, { useEffect, useState } from "react";
import styles from "./Post.module.css";
import image from "../assets/soldier.jpeg";
import Comment from "./Comment";
import SearchBar from "./SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import authServiceInstance from "./service/APIService";

export default function Post() {
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [index, setIndex] = useState(0);
  const [isThereNext, setIsThereNext] = useState(false);
  const navigate = useNavigate();

  const next = () => {
    setIndex((prev) => (prev + 1) % post.photos.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + post.photos.length) % post.photos.length);
  };

  const handleLike = async () => {
    try {
      setLiked(!liked);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
      await authServiceInstance.likePost(post._id, "ezratarab684");
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };
  const handleComment = async () => {
    try {
      console.log("got here");
      await authServiceInstance.likePost(post._id, "ezratarab684", newComment);
      setNewComment("");
    } catch (err) {
      console.error("Failed to comment post:", err);
    }
  };

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const post = await authServiceInstance.getPost(postId);
        setPost(post);
        setLikes(post.likes.length || 0);
        setComments(post.comments);
        ///כשאני מוסיף את הטוקן אז להוסיף אם היוזר עשה לייק
        if (post.photos.length > 1) setIsThereNext(true);
      } catch (error) {
        console.log("error while trying to fetch post: ", error);
      }
    };
    fetchPost();
  }, [postId]);
  console.log(post);
  console.log(likes);
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
            {isThereNext && (
              <button className={styles.arrow} onClick={prev}>
                ←
              </button>
            )}
            <div className={styles.imageContainer}>
              <img
                src={post.photos[index]}
                alt={`photo ${index}`}
                className={styles.image}
              />
            </div>
            {isThereNext && (
              <button className={styles.arrow} onClick={next}>
                →
              </button>
            )}
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
            onClick={handleLike}
          >
            ❤️
          </button>
          <div className={styles.likes}>{likes}</div>
          {/*RIGHT SIDE*/}
          <div className={styles.rightSide}>
            <div className={styles.authorWrapper}>
              <div
                className={styles.author}
                onClick={() => navigate(`/profile/${post.author.username}`)}
              >
                {post.author.username}
              </div>
              <small className={styles.description}>{post.description}</small>
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
