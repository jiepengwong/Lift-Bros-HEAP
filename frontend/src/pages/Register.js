import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux"; // Import useDispatch from 'react-redux' to access the store's dispatch function
import { setRegisterUser } from "../redux/slice/loginSlice";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Name, setName] = useState("");
  const navigate = useNavigate();
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

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password === passwordConfirmation) {
      if (isPasswordValid(password)) {
        try {
          // Assuming you have a registration API endpoint on your backend
          console.log(dateOfBirth + "T08:00:00.000Z");
          console.log(Date.parse(dateOfBirth));
          console.log(new Date().toJSON());
          const response = await axios.post(
            "http://localhost:8080/newUser",
            {
              username: userName, // Use the 'firstName' as the username
              name: Name,
              password: password,
              dob: dateOfBirth + "T08:00:00.000Z",
              phoneNo: phoneNumber,
              email: email,
            },
            { withCredentials: true }
          );
          navigate("/login");
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred during registration.");
        }
      } else {
        setPasswordError("Password does not meet criteria.");
      }
    } else {
      setPasswordError("Passwords do not match");
    }
  };

  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
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
      <div className="band fixed inset-x-0 top-0 bg-yellow-300 text-black py-4 z-10">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold text-center">Lift Bros 🦾</h1>
        </div>
      </div>

      {/* Register Form */}
      <div className="flex justify-center items-center h-full mt-9">
        <div className="relative rounded-lg shadow-md p-3.5 bg-gray-200 z-0 max-w-md w-full mx-4">
          {" "}
          {/* z axis to make form behind banner and mt-9 to push register form down */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Register</h2>

            <form onSubmit={handleFormSubmit}>
              <div className="mb-0.5">
                <label
                  className="block text-gray-700 font-bold mb-0.5"
                  htmlFor="userName"
                >
                  Username
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={handleUserNameChange}
                  required
                />
              </div>
              <div className="mb-1">
                <label
                  className="block text-gray-700 font-bold mb-0.5"
                  htmlFor="Name"
                >
                  Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="Name"
                  value={Name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="mb-1">
                <label
                  className="block text-gray-700 font-bold mb-0.5"
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
              <div className="mb-0">
                <label
                  className="block text-gray-700 font-bold mb-0.5"
                  htmlFor="password"
                >
                  Password
                </label>
                {/* Password Requirements Notice */}
                <p
                  className="mb-0 text-gray-600"
                  style={{ fontSize: "0.8rem" }}
                >
                  password must have at least 8 characters and contain at least
                  one of the following: upper case letters, lower case letters,
                  numbers and symbols.
                </p>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="mb-1">
                <label
                  className="block text-gray-700 font-bold mb-0.5"
                  htmlFor="passwordConfirmation"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="password"
                  id="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={handlePasswordConfirmationChange}
                  required
                />
              </div>
              <div className="mb-1">
                <label
                  className="block text-gray-700 font-bold mb-0.5"
                  htmlFor="dateOfBirth"
                >
                  Date of Birth
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="date"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={handleDateOfBirthChange}
                  required
                />
              </div>

              <div className="mb-1">
                <label
                  className="block text-gray-700 font-bold mb-0.5"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                />
              </div>

              {passwordError && <p className="text-red-500">{passwordError}</p>}
              <button
                className="bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </form>
            <p className="mt-1">
              Already have an account?{" "}
              <span className="text-blue-500 cursor-pointer">
                <a href="/login">Login here</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
