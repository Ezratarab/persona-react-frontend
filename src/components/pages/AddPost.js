import React, { useEffect, useRef, useState } from "react";
import styles from "./AddPost.module.css";
import UploadPost from "../UploadPost";
import ArmyLocation from "../../assets/location-army-logo.webp";
import authServiceInstance from "../service/APIService";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const [offset, setOffset] = useState(0);
  const [countImages, setCountImages] = useState(0);
  const [description, setDescription] = useState("");
  const [searched, setSearched] = useState();
  const [uploaded, setUploaded] = useState(true);
  const [users, setUsers] = useState();
  const [location, setLocation] = useState("");
  const requestRef = useRef();
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const speed = 2;
  const spacing = 50;
  const labelCount = 100;

  const animate = () => {
    setOffset((prev) => {
      const resetPoint = spacing * labelCount;
      return (prev + speed) % resetPoint;
    });
    requestRef.current = requestAnimationFrame(animate);
  };
  const handleCountImages = (number) => {
    setCountImages(() => {
      sessionStorage.setItem("countImages", number);
      return number;
    });
  };
  const handleDescription = (e) => {
    const text = e.target.value;
    setDescription(text);
    let words = text.trim().split(/\s+/);
    const lastWord = words[words.length - 1];
    if (lastWord.startsWith("@")) {
      const searchedPeople = lastWord.slice(1);
      setSearched(searchedPeople);
    } else {
      setSearched();
    }
  };
  const handleMentionedUser = (clickedUsername) => {
    const text = description;
    let words = text.trim().split(/\s+/);
    words.pop();
    words.push(`@${clickedUsername}`);
    const updatedText = words.join(" ") + " ";
    setDescription(updatedText);
    setTimeout(() => {
      if (textareaRef.current) {
        console.log("-------------------", updatedText);
        const pos = updatedText.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(pos, pos);
      }
    }, 0);
    setSearched();
  };
  const handlePost = async () => {
    const descriptionText = description ?? null;
    const locationText = location ?? null;

    const arrayOfPosts = sessionStorage.getItem("images");
    const parsedPosts = JSON.parse(arrayOfPosts || "[]");
    const cleanedPosts = parsedPosts.filter((item) => item != null);

    const count = sessionStorage.getItem("countImages");

    if (!count || Number(count) === 0) {
      alert("UPLOAD IMAGES!");
      return;
    }

    try {
      setUploaded(false); // Start uploading

      const response = await authServiceInstance.post(
        "ezratarab684",
        cleanedPosts,
        descriptionText,
        locationText
      );

      if (response.status === 201) {
        alert(response.data.message);
        navigate("/profile/ezratarab684");
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    } finally {
      setUploaded(true); // Upload complete
    }
  };

  useEffect(() => {
    const storedCount = sessionStorage.getItem("countImages");
    if (storedCount !== null) {
      setCountImages(Number(storedCount));
    }
  }, []);
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
  useEffect(() => {
    const getAllUsers = async () => {
      const users = await authServiceInstance.getAllUsers();
      console.log(users);
      setUsers(users.users);
    };
    getAllUsers();
  }, []);

  const labels = Array.from({ length: labelCount });
  if (!uploaded) {
    return <div className={styles.uploading}>Uploading...</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.scrollingWrapper}>
        <div
          className={styles.scrollingBar}
          style={{
            transform: `translateX(-${offset}px)`,
          }}
        >
          {[...Array(2)].map((_, j) =>
            labels.map((_, i) => (
              <span key={`${j}-${i}`} className={styles.label}>
                please do not put secure photos
              </span>
            ))
          )}
        </div>
      </div>
      <div className={styles.countImages}>count images: {countImages}</div>
      <div className={styles.uploadPost}>
        <UploadPost onCountImage={handleCountImages} />
      </div>
      <div className={styles.description}>
        <div className={styles.descriptionTitle}>Description:</div>
        <textarea
          ref={textareaRef}
          type="text"
          placeholder="write here your thoughts"
          value={description}
          onChange={handleDescription}
        />
        <div className={styles.optionsWrapper}>
          <div className={styles.options}>
            {searched &&
              searched.length > 0 &&
              users
                .filter((person) =>
                  person.username
                    .toLowerCase()
                    .startsWith(searched.toLowerCase())
                )
                .map((person) => (
                  <div
                    className={styles.option}
                    onClick={() => handleMentionedUser(person.username)}
                    key={person.username}
                  >
                    <img
                      className={styles.profilePhoto}
                      src={person.profilePhoto}
                      alt="profile"
                    />
                    @{person.username}
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className={styles.location}>
        <img
          className={styles.locationLogo}
          src={ArmyLocation}
          alt="location logo"
        />
        <input
          type="text"
          placeholder="Add Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>

      <button className={styles.postButton} onClick={handlePost}>
        POST
      </button>
    </div>
  );
}
