import logo from "./logo.svg";
import "./App.css";
// Redux
import { useSelector } from "react-redux";
// Import components
import Navbar from "./component/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
// import LoginTest from "./pages/LoginTest";
import Register from "./pages/Register";

// import Home from "./pages/Home";
import Planner from "./pages/Planner.jsx";
import CreateRoutine from "./pages/CreateRoutine";
import DuringRoutine from "./pages/DuringRoutine";
import Endpage from "./pages/Endpage";
import LoginTest from "./pages/LoginTest";
import RequireAuth from "./component/RequireAuth";
import useAuth from "./utils/useAuth";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  console.log("testing app.js, this is in app.js!");
  const { auth } = useAuth();
  const { setAuth } = useAuth();

  // Set token and expirationTime to null when expired
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
  }, [document.cookie]);

  const shouldRenderNavbar = !(
    window.location.pathname.toLowerCase() === "/login" ||
    window.location.pathname.toLowerCase() === "/register"
  );

  return (
    <div className="App">
      {shouldRenderNavbar && <Navbar />}
      <div>
        <Routes>
          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Homepage />} exact />
            <Route path="/routine" element={<Planner />} />
            <Route path="/createRoutine" element={<CreateRoutine />} />
            <Route path="/end" element={<Endpage />} />
            <Route path="/during" element={<DuringRoutine />} />
          </Route>

          {/* Public routes */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<LoginTest />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
