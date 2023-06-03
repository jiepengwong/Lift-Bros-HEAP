import logo from "./logo.svg";
import "./App.css";
// Import components
import Navbar from "./component/Navbar";
import Homepage from "./pages/Homepage";
import Planner from "./pages/Planner";
import CreateRoutine from "./pages/CreateRoutine";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Homepage />} />
          <Route path="/routine" element={<Planner />} />
          <Route path="/createRoutine" element={<CreateRoutine />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
