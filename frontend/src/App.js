import logo from "./logo.svg";
import "./App.css";
// Redux
import { useSelector } from "react-redux";
// Import components
import Navbar from "./component/Navbar";
import Homepage from "./pages/Homepage";

import Login from "./pages/Login";
import Register from "./pages/Register";
// import Home from "./pages/Home";
// test

import Planner from "./pages/Planner";
import CreateRoutine from "./pages/CreateRoutine";
import DuringRoutine from "./pages/DuringRoutine";
import Endpage from "./pages/Endpage";
import LoginTest from "./pages/LoginTest";
import RequireAuth from "./component/RequireAuth";
import useAuth from "./utils/useAuth";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  console.log("testing app.js , this is in app.js!");
  const { auth } = useAuth();
  const { setAuth } = useAuth();

  // Set token and expiraTime to null when expired
  var token = null;
  var expirationTime = null;

  useEffect(() => {
    console.log("useEffect in app.js");
    // Check token not null and expiration time still valid
    if (
      auth.token != null &&
      auth.expirationTime * 1000 < new Date().getTime()
    ) {
      alert("Your session has expired, please log in again");
      setAuth({ token, expirationTime });

      // Check if toke is not null, and the expiration time is still valid, this sentence here means that the expiration time is still more than current time
    } else if (
      auth.token != null &&
      auth.expirationTime * 1000 > new Date().getTime()
    ) {
      alert("You are logged in");
      setTimeout(() => {
        alert("Your session has expired, please log in again");
        setAuth({ token, expirationTime });
      }, auth.expirationTime * 1000 - new Date().getTime());
    }

    // Because i set it here, the useEffect runs an additional one more time, there is no problem on the web but is there a way to make it better
  }, [document.cookie]);

  return (
    <div className="App">
      <Navbar />
      <div>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}

<<<<<<< HEAD
          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Homepage />} exact />
            <Route path="/routine" element={<Planner />} />
            <Route path="/createRoutine" element={<CreateRoutine />} />
            <Route path="/end" element={<Endpage />} />
          </Route>
=======
            {/* Protected Routes */}
            <Route element={<RequireAuth/>}>
              <Route path="/" element={<Homepage />} exact />
              <Route path="/routine" element={<Planner />} />
              <Route path="/createRoutine" element={<CreateRoutine />} />
              <Route path="/end" element={<Endpage />} />
              <Route path="/during" element={<DuringRoutine />} />
            </Route>
            
            {/* Public routes */}
            <Route path="/login" element={<LoginTest/>} />
          </Routes>
>>>>>>> 7179b7a2cae2413c10971419c431df597af9e5a4

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
