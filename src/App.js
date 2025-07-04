import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login.js";
import NavBar from "./components/Navbar.js";
import Home from "./components/pages/Home.js";
import Profile from "./components/pages/Profile.js";
import Post from "./components/Post.js";
import AddPost from "./components/pages/AddPost.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Home />}></Route>
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/post/:postId" element={<Post />}></Route>
          <Route path="/addPost" element={<AddPost />}></Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
