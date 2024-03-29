import logo from "./logo.svg";
import "./App.css";
// Redux
import { useSelector } from "react-redux";
// Import components
import Navbar from "./component/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import History from "./pages/History";
// import LoginTest from "./pages/LoginTest";
import Register from "./pages/Register";

// import Home from "./pages/Home";
import Planner from "./pages/Planner.jsx";
import CreateRoutine from "./pages/CreateRoutine";
import DuringRoutine from "./pages/DuringRoutine";
import Endpage from "./pages/Endpage";
import LoginTest from "./pages/LoginTest";
import RequireAuth from "./utils/RequireAuth";
// import useAuth from "./utils/useAuth";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import { startGlobalTimer, clearGlobalTimer } from "./utils/GlobalTimer"; // Import the new utility
import { Helmet } from "react-helmet";
import NotFound from "./pages/NotFound";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();

  // List of routes where the navbar should be rendered
  const routesWithNavbar = [
    "/",
    "/routine",
    "/createRoutine",
    "/end",
    "/during",
    "/history",
    // '/login', == Excluded ==
    // '/register' == Excluded ==
    // Add more routes where the navbar should be rendered
  ];

  // Determine whether to render the navbar based on the current route
  const shouldRenderNavbar = routesWithNavbar.includes(location.pathname);
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lift Bro</title>
        <link rel="canonical" href="https://liftbro.netlify.app/" />
        <meta
          name="description"
          content="Start your gym routine today with LiftBro"
        />
      </Helmet>
      {shouldRenderNavbar && <Navbar />}
      <div>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Homepage />} exact />
            <Route path="/routine" element={<Planner />} />
            <Route path="/createRoutine" element={<CreateRoutine />} />
            <Route path="/end" element={<Endpage />} />
            <Route path="/during" element={<DuringRoutine />} />
            <Route path="/history" element={<History />} />
          </Route>

          {/* This route catches all unmatched routes and displays the 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
