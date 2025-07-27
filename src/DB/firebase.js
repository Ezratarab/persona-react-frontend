import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDilayqeq0TK6-3Ie--Bj5ehlauKP-rn1o",
  authDomain: "persona-ad3e7.firebaseapp.com",
  projectId: "persona-ad3e7",
  storageBucket: "persona-ad3e7.firebasestorage.app",
  messagingSenderId: "328603371964",
  appId: "1:328603371964:web:7beae5e6f0573733ce83b9",
  measurementId: "G-4W0KT6CBYF",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
