import React, { useEffect, useRef, useState } from "react";
import styles from "./AddPost.module.css";

export default function AddPost() {
  const [offset, setOffset] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const requestRef = useRef();
  const fileInputRef = useRef(null);

  const speed = 2;
  const spacing = 50;
  const labelCount = 100;

  const animate = () => {
    setOffset((prev) => (prev + speed) % window.innerWidth);
    requestRef.current = requestAnimationFrame(animate);
  };
  const openFolder = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.warn("File input ref is not ready");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const labels = Array.from({ length: labelCount });

  return (
    <div className={styles.container}>
      <div
        className={styles.scrollingBar}
        style={{
          left: `${-offset}px`,
          width: `${window.innerWidth + labelCount * spacing}px`,
        }}
      >
        {labels.map((_, i) => (
          <span key={i} className={styles.label}>
            please do not put secure photos
          </span>
        ))}
      </div>

      <div className={styles.upload} onClick={openFolder}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        ) : (
          "upload photo -> clickkkkkk"
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
