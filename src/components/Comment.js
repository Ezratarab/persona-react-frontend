import React from "react";
import styles from "./Comment.module.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function Comment({ comment }) {
  const navigate = useNavigate();
  const handleClickWriter = (username) => {
    navigate(`/profile/${username}`);
  };
  dayjs.extend(relativeTime);

  return (
    <div>
      <div className={styles.commentRow}>
        <div
          className={styles.writer}
          onClick={() => handleClickWriter(comment.user.username)}
        >
          {comment.user.username}
        </div>
        <p className={styles.text}>{comment.text}</p>
      </div>
      <div className={styles.time}>{dayjs(comment.createdAt).fromNow()}</div>
    </div>
  );
}
