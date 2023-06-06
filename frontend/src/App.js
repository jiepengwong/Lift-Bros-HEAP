import logo from "./logo.svg";
import "./App.css";
// Import components
import Navbar from "./component/Navbar";
import Homepage from "./pages/Homepage";
import History from "./pages/History";
// test
// import Home from "./pages/Home";
import Planner from "./pages/Planner.js";
import Endpage from "./pages/Endpage";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Routes>
          <Route path="/history" element={<History />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/routine" element={<Planner />} />
          <Route path="/end" element={<Endpage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
