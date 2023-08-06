import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { startGlobalTimer, clearGlobalTimer } from "../utils/GlobalTimer"; // Import the global timer functions

// import { setLoginStatus } from '../redux/slice/loginSlice';
function LoginTest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expirationTimer, setExpirationTimer] = useState(null); // State for the global timer

  // If the user is already logged in, redirect to home page
  useEffect(() => {
    if (localStorage.getItem("username")) {
      console.log("User is already logged in. Redirecting to home page...");
      navigate("/");
    }
  }, [navigate]);


  // For global timer
  const handleTokenExpiration = () => {
    alert("Your user session has expired, please log in again");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    navigate("/login");
  };

  // Usage of axios
  const loginSimulation = async (event) => {
    event.preventDefault();

    const username = "bao";
    const password = "password";

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );


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
        navigate("/"); // Navigate to the login page if not authenticated
      } else {
        console.log("Token not found.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };


  return (
    // Simulate login page

    <div>
      <h1>LoginTest</h1>
      <h2>testing 1 2 3</h2>
      {/* Login */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={loginSimulation}
      >
        Login
      </button>

     
     
    </div>
  );
}

export default LoginTest;
