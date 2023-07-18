import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [passwordError, setPasswordError] = useState("");
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

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (password === passwordConfirmation) {
      if (isPasswordValid(password)) {
        console.log(
          "Registering with:",
          email,
          password,
          firstName,
          lastName,
          dateOfBirth
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setDateOfBirth("");
        setPasswordError("");
      } else {
        setPasswordError(
          "Password must have at least 8 characters with a mix of uppercase and lowercase letters, and at least one number and one special character."
        );
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative rounded-lg shadow-md p-6 bg-gray-200 z-20 max-w-lg w-full">
          <div>
            <h2 className="text-3xl font-bold mb-4">Register</h2>

            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="firstName"
                >
                  Username
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="lastName"
                />
              </div>
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
                {/* Password Requirements Notice */}
                <p className="mb-4 text-gray-600">
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
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
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              <button
                className="bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </form>
            <p className="mt-4">
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
