import React from "react";
import styles from "./Comment.module.css";

export default function Comment({ comment }) {
  console.log(comment.text);
  return (
    <div>
      <div className={styles.writer}>{comment.writer}</div>
      <div className={styles.text}>{comment.text}hh</div>
    </div>
  );
}
