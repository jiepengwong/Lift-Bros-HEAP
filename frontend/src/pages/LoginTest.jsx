import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../redux/slice/loginSlice";
// import { setLoginStatus } from '../redux/slice/loginSlice';
function LoginTest() {
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
      const jwtToken = getCookieValue("jwt");
      let decodedToken = jwt_decode(jwtToken);
      let expirationTime = decodedToken.exp;
      console.log(decodedToken);
      setAuth({ jwtToken, expirationTime });
      // Push to redux
      // dispatch(setLoginStatus(true))
      // dispatch(setLoginUser({ username: username, token: jwtToken }));

      // Set to localstorage instead 
      localStorage.setItem("username", username);
      localStorage.setItem("token", jwtToken);

      const localStorageUsername = localStorage.getItem("username");
      const localStorageToken = localStorage.getItem("token");
      console.log(username, localStorageUsername);


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

  const logoutSimulation = async (event) => {
    event.preventDefault();

    const username = "bao";
    const password = "password";

    try {
      const response = await axios.post(
        "http://localhost:8080/user/logout",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      // Retrieve the token from the response headers
      console.log(response.headers);
      const token = response.headers["set-cookie"];

      // Store the token wherever you prefer (e.g., in state, context, or localStorage)
      // Example using redux
    } catch (error) {
      console.error("Error:", error);
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

      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={logoutSimulation}
      >
        Logout
      </button>
    </div>
  );
}

export default LoginTest;
