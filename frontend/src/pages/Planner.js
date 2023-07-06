import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPlusCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

// Components
import CardPlanner from "../component/CardPlanner";
function Planner() {
  // Active tab state
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  // Need to account for content display based on the active tab

  // Database data

  return (
    <div>
      <div>
        {/* Planner page */}

        <h1 class="text-xl sm:text-lg lg:text-4xl font-bold text-center m-10 p-2">
          Welcome to the Routines Page
        </h1>

        {/* Tab bar to filter between my Routines, favourites and other people routines */}

        <div className="flex justify-center mb-11">
          <nav className="flex flex-wrap justify-center sm:justify-start space-x-0 sm:space-x-10">
            {/* Desktop navigation items */}
            <button
              className={`text-xl text-gray-500 hover:text-gray-800 focus:outline-none ${
                activeTab === 0 ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleTabChange(0)}
            >
              My Routines
            </button>
            <button
              className={`text-xl text-gray-500 hover:text-gray-800 focus:outline-none ${
                activeTab === 1 ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleTabChange(1)}
            >
              My Favourites
            </button>
            <button
              className={`text-xl text-gray-500 hover:text-gray-800 focus:outline-none ${
                activeTab === 2 ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleTabChange(2)}
            >
              Other Routines
            </button>

            {/* Mobile dropdown menu */}
            <div className="relative inline-block sm:hidden">
              <button
                className="text-xl text-gray-500 hover:text-gray-800 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  className="w-6 h-6 cursor-pointer"
                />
              </button>
              {mobileMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white shadow-lg rounded-xl">
                  <button
                    className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                      activeTab === 0 ? "font-bold" : ""
                    }`}
                    onClick={() => handleTabChange(0)}
                  >
                    My Routines
                  </button>
                  <button
                    className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                      activeTab === 1 ? "font-bold" : ""
                    }`}
                    onClick={() => handleTabChange(1)}
                  >
                    My Favourites
                  </button>
                  <button
                    className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                      activeTab === 2 ? "font-bold" : ""
                    }`}
                    onClick={() => handleTabChange(2)}
                  >
                    Other Routines
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center mt-3 sm:mt-0">
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-800"
              />
            </div>
          </nav>
        </div>

        {/* Grid act as the container here */}
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
          {/* CardPlanner Components Hardcoded */}
          <CardPlanner />

          <CardPlanner />

          <CardPlanner />

          <CardPlanner />
        </div>
      </div>
    </div>
  );
}

export default Planner;
