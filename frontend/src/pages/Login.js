import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../redux/slice/loginSlice";
import { startGlobalTimer } from "../utils/GlobalTimer";
import baseAxios from "../axios/baseAxios";
import Swal from 'sweetalert2'
import { faBold } from "@fortawesome/free-solid-svg-icons";
import WebFont from 'webfontloader';



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(""); //login error

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
    "/videos/Untitled.mp4",
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    playCurrentVideo();
  }, [currentVideoIndex]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", username, password);
    setUsername("");
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

  // For global timer
  const handleTokenExpiration = () => {
    alert("Your user session has expired, please log in again");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    navigate("/login");
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await baseAxios.post(
        "/login",
        {
          username: username,
          password: password,
        });


      const jwtToken = response.data.cookie.value;
      const expirationTimeISO = response.data.cookie.expires;
  
      // Convert ISO 8601 timestamp to Unix timestamp in seconds
      const expirationTimeUnix = Math.floor(new Date(expirationTimeISO).getTime() / 1000);
  
      // Calculate the time remaining until token expiration
      const currentTime = Math.floor(new Date().getTime() / 1000);
      const timeRemaining = expirationTimeUnix - currentTime;

      localStorage.setItem("username", username);
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("expirationTime", expirationTimeISO);
      


      // Start the global timer for token expiration
      startGlobalTimer(handleTokenExpiration, timeRemaining * 1000);


      if (jwtToken) {
        console.log("Token:", jwtToken);
        console.log("Navigating to home page.");
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully logged in!',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        navigate("/"); // Navigate to the login page if not authenticated
      } else {
        console.log("Token not found.");        
        setLoginError("Username or Password is incorrect."); //login error message for users

      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("Username or Password is incorrect.");
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

      {/* Login Form */}
      <div className="flex justify-center items-center h-screen">
        <div className="relative rounded-lg shadow-md p-6 bg-yellow-300 z-0">
          <div>
            <h1 className="text-5xl font-bold mb-8">Lift Bros 🦾</h1>
            </div>
            <hr  style={{
              color: '#000000',
              backgroundColor: '#000000',
              height: 1,
              borderColor : '#000000'
              }}/>
          <div>
            <h2 className="text-3xl font-bold mb-5">Login</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="username"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
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
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={login}
              >
                Login
              </button>
            </form>
            {loginError && ( // Conditionally render the error message
              <p className="mt-1 text-red-500">{loginError}</p>
            )}
            <p className="mt-1">
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
