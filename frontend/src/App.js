import logo from './logo.svg';
import './App.css';
// Import components
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Planner from './pages/Planner.js';

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
function App() {
  return (
    <div className="App">
        <Navbar />
        <div >
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<Planner />} />
          </Routes>

        </div>

  </div>

  );
}

export default App;
