import logo from "./logo.svg";
import "./App.css";
// Import components
import Navbar from "./component/Navbar";
import Homepage from "./pages/Homepage";
import Planner from "./pages/Planner";
import CreateRoutine from "./pages/CreateRoutine";
import Endpage from "./pages/Endpage";
import PrivateRoute from "./utils/PrivateRoute";
import LoginTest from "./pages/LoginTest";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Homepage />} exact />
              <Route path="/routine" element={<Planner />} />
              <Route path="/createRoutine" element={<CreateRoutine />} />
              <Route path="/end" element={<Endpage />} />
            </Route>
            
            <Route path="/login" element={<LoginTest/>} />
          </Routes>

      </div>
    </div>
  );
}

export default App;
