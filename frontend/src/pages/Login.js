import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../redux/slice/loginSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const dispatch = useDispatch();

  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(name));
    if (cookie) {
      return cookie.split("=")[1];
    }
    return null;
  };

  const videoRef = useRef(null);
  const videos = [
    "/videos/Video1.mp4",
    "/videos/Video2.mp4",
    "/videos/Video3.mp4",
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    playCurrentVideo();

    const timer = setInterval(changeVideo, 10000);

    return () => clearInterval(timer);
  }, [currentVideoIndex]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    setEmail("");
    setPassword("");
  };

  const playCurrentVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.src = videos[currentVideoIndex];
      video.load();

      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(handleAutoplayError);
      }
    }
  };

  const changeVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleVideoEnded = () => {
    changeVideo();
  };

  const handleAutoplayError = () => {
    // Handle autoplay error here (e.g., display a play button)
    console.log("Autoplay error occurred");
  };

  const testlol = () => {
    console.log("lol");
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      console.log(email, password);
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          username: email,
          password: password,
        },
        { withCredentials: true }
      );
      const jwtToken = response.data.cookie;
      let expirationTime = jwtToken.expires;
      let jwtValue = jwtToken.value;
      document.cookie = `${jwtToken.name}=${jwtToken.value}; expires=${expirationTime}; path=/;`;
      setAuth({ jwtValue, expirationTime });
      // Push to redux
      // dispatch(setLoginStatus(true))
      dispatch(setLoginUser({ username: email, token: jwtToken }));

      console.log("Token:", jwtToken);

      // Usage
      // const token = getCookieValue('jwt');

      if (jwtToken) {
        console.log("Token:", jwtToken);
        // Dispatch or perform further actions with the token if needed
        // Navigate to different page
        console.log("Navigating to home page.");
        navigate("/"); // Navigate to the login page if not authenticated
        console.log("Navigating to home page tset.");
      } else {
        console.log("Token not found.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onEnded={handleVideoEnded}
        />
      </div>

      {/* Banner */}
      <div className="band fixed top-0 left-0 w-full bg-yellow-300 text-black py-4 z-10">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold">Lift Bros 🦾</h1>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex justify-center items-center h-screen">
        <div className="relative rounded-lg shadow-md p-6 bg-gray-200 z-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">Login</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button
                className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={login}
              >
                Login
              </button>
            </form>
            <p className="mt-4">
              Don't have an account?{" "}
              <span className="text-blue-500 cursor-pointer">
                <a href="/register">Register here</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
