import React, { useState } from "react";
import "tailwindcss/tailwind.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password === passwordConfirmation) {
      console.log("Registering with:", email, password, firstName, lastName);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src="/videos/Video1.mp4" type="video/mp4" />
          <source src="/videos/Video2.mp4" type="video/mp4" />
          <source src="/videos/Video3.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Banner */}
      <div className="band fixed top-0 left-0 w-full bg-yellow-300 text-black py-4 z-10">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold">Lift Bros 🦾</h1>
        </div>
      </div>

      {/* Register Form */}
      <div className="flex justify-center items-center h-screen">
        <div className="relative rounded-lg shadow-md p-6 bg-gray-200 z-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">Register</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
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
                >
                  Last Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
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
              <button
                className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
