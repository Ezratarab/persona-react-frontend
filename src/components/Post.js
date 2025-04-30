import React, { useState } from "react";
import styles from "./Post.module.css";
import image from "../assets/soldier.jpeg";
import Comment from "./Comment";
const comments = [
  { text: "This is the first comment", writer: "elinor" },
  { text: "This is the second comment", writer: "Julia" },
  { text: "This is the third comment", writer: "Ethan" },
  { text: "This is the fourth comment", writer: "Hannah" },
  { text: "This is the fifth comment", writer: "Charlie" },
  { text: "This is the sixth comment", writer: "Dana" },
  { text: "This is the seventh comment", writer: "George" },
  { text: "This is the eighth comment", writer: "Fay" },
  { text: "This is the ninth comment", writer: "Ivan" },
  { text: "This is the tenth comment", writer: "Alice" },
  { text: "This is the eleventh comment", writer: "Bob" },
  { text: "This is the twelfth comment", writer: "Julia" },
  { text: "This is the thirteenth comment", writer: "George" },
  { text: "This is the fourteenth comment", writer: "Charlie" },
  { text: "This is the fifteenth comment", writer: "Hannah" },
  { text: "This is the sixteenth comment", writer: "Ethan" },
  { text: "This is the seventeenth comment", writer: "Alice" },
  { text: "This is the eighteenth comment", writer: "Ivan" },
  { text: "This is the nineteenth comment", writer: "Fay" },
  { text: "This is the twentieth comment", writer: "Dana" },
];

export default function Post() {
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");

  const toggleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className={styles.fullscreenCardWrapper}>
      <div className={styles.fullscreenCard}>
        {/*LEFT SIDE*/}
        <img src={image} className={styles.image} />
        <button
          className={`${styles.heartButton} ${liked ? styles.liked : ""}`}
          onClick={toggleLike}
        >
          ❤️
        </button>
        {/*RIGHT SIDE*/}
        <div className={styles.rightSide}>
          <div className={styles.authorWrapper}>
            <div className={styles.author}>NAME</div>
            <small className={styles.description}>
              Under the warm golden light of the setting sun, the small town
              came alive with a quiet, almost magical energy. Under the warm
              golden light of the setting sun, the small town came alive with a
              quiet, almost magical energy. Under the warm golden light of the
              setting sun, the small town came alive with a quiet, almost
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
  );
}
