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
import LogoutPage from "./pages/LogoutPage";

// import Home from "./pages/Home";
import Planner from "./pages/Planner.jsx";
import CreateRoutine from "./pages/CreateRoutine";
import DuringRoutine from "./pages/DuringRoutine";
import Endpage from "./pages/Endpage";
import LoginTest from "./pages/LoginTest";
import RequireAuth from "./utils/RequireAuth";
// import useAuth from "./utils/useAuth";
import { useEffect , useState} from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import { startGlobalTimer, clearGlobalTimer } from "./utils/GlobalTimer"; // Import the new utility

function App() {
  const navigate = useNavigate();




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
          <Route path="/login" element={<Login />} />
          {/* <Route path="/login" element={<LoginTest />} /> */}
          <Route exact path="/logout" component={LogoutPage} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
