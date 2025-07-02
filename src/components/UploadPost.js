import React, { useEffect, useRef, useState } from "react";
import styles from "./UploadPost.module.css";
import { useParams } from "react-router-dom";

export default function UploadPost({ onCountImage }) {
  const [imageArray, setImageArray] = useState([null]);
  const [countImages, setCountImages] = useState(0);
  const fileInputRef = useRef(null);

  const openFolder = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (imageArray.length >= 5) {
      alert("You can only upload up to 4 images.");
      return;
    }

    const url = URL.createObjectURL(file);
    setImageArray((prev) => {
      const updated = [...prev, url];
      sessionStorage.setItem("images", JSON.stringify(updated));
      return updated;
    });
    setCountImages((prev) => prev + 1);
  };

  const handleDeleteImage = (indexToRemove) => {
    setImageArray((prev) => {
      const updated = prev.filter((_, i) => i !== indexToRemove);
      localStorage.setItem("images", JSON.stringify(updated));
      localStorage.setItem("countImages", countImages - 1);
      setCountImages((prev) => prev - 1);
      return updated;
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem("images");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const cleanImages = parsed.filter((img) => img !== null);
          setImageArray([null, ...cleanImages]);
          setCountImages(cleanImages.length);
        }
      } catch (err) {
        console.error("Failed to parse images from localStorage", err);
      }
    }
  }, []);
  useEffect(() => {
    onCountImage(countImages);
  }, [countImages]);

  return (
    <div>
      <div className={styles.uploadList}>
        <div className={styles.upload} onClick={openFolder}>
          +
        </div>
        {imageArray
          ?.slice()
          .reverse()
          .map((image, index) => {
            if (!image) return null;

            const originalIndex = imageArray.length - 1 - index;

            return (
              <div key={originalIndex} className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={image}
                  alt={`Selected ${index}`}
                />
                <button
                  className={styles.deleteImageButton}
                  onClick={() => handleDeleteImage(originalIndex)}
                >
                  Delete Image
                </button>
              </div>
            );
          })}
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
