import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlusCircle, faBars } from '@fortawesome/free-solid-svg-icons';

// Components
import CardPlanner from '../component/CardPlanner';
function Planner() {

  const [plannerButtons, setPlannerButtons] = useState(["Favourites", "Routines", "Other Routines"]);

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


        <h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center m-10 p-2">Welcome to the Routines Page</h1>





        {/* Tab bar to filter between my Routines, favourites and other people routines */}


        <div className="flex justify-center mb-11">
          <nav className="hidden sm:flex flex-wrap justify-center sm:justify-start space-x-0 sm:space-x-10">
            {/* Desktop navigation items */}

            {/* Array map the buttons*/}
            {plannerButtons.map((button, index) => (
              <button
                key={index}
                className={`text-xl text-gray-500 hover:text-gray-800 focus:outline-none ${activeTab === index ? 'border-b-2 border-blue-500' : ''
                  }`}
                onClick={() => handleTabChange(index)}
              >
                {button}
              </button>
            ))}


            <div className="flex items-center mt-3 sm:mt-0">
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-800"

              />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="sm:hidden relative inline-block">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={toggleMobileMenu}
            >
              Dropdown button{' '}
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {mobileMenuOpen && (
              <div
                id="dropdown"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
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
  )
}

export default Planner