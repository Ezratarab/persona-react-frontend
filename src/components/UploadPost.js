import React, { useEffect, useRef, useState } from "react";
import styles from "./UploadPost.module.css";

export default function UploadPost({ onCountImage, onFilesSelected }) {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const openFolder = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    onCountImage(newFiles.length);
    onFilesSelected(newFiles);
  };

  const handleDeleteImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onCountImage(newFiles.length);
    onFilesSelected(newFiles);
  };

  return (
    <div>
      <div className={styles.uploadList}>
        <div className={styles.upload} onClick={openFolder}>
          +
        </div>

        {files
          .slice()
          .reverse()
          .map((file, index) => {
            const originalIndex = files.length - 1 - index;
            const previewUrl = URL.createObjectURL(file);

            return (
              <div key={originalIndex} className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={previewUrl}
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
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
