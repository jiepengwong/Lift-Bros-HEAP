import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlusCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
// Import components
import Modal from '../component/Modal';

// Components
import CardPlanner from '../component/CardPlanner';
import { useSelector } from 'react-redux';

import axios from 'axios';

function Planner() {
  const navigate = useNavigate();
  const [usernameDetails,setUsernameDetails] = useState(useSelector(state => state.login.loginUser))
  // Template buttons
  const [plannerButtons, setPlannerButtons] = useState([
    'My Routines',
    'Other Routines',
    'Add New Routine',
  ]);

  // === Tabs ===
  // Active tab state
  const [activeTab, setActiveTab] = useState(0);
  // Change tabs
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  //  === Modal local states ===
  const [showModal, setShowModal] = useState(false);


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };


  // Database data
  useEffect(() => {
    // Fetch data from database
    // Set data to state
    
    if (activeTab == 0) {
      // Fetch user tabs
      console.log(usernameDetails.token)
      axios.get(`http://localhost:8080/routine/${usernameDetails.username}`, {
      
      })
      .then((response) => {
        console.log(response.data)
      }
      )
      .catch((error) => {
        console.log(error)
      }
      )
    }

    if (activeTab == 1) {
       // Fetch other user data

    }

  }, [activeTab]);


  return (
    <div>
      <div>
        {/* Planner page */}
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center m-10 p-2">
          Welcome to the Routines Page
        </h1>

        {/* Tab bar to filter between my Routines, favourites and other people routines */}
        <div className="flex justify-center mb-11">
          <nav className="hidden sm:flex flex-wrap justify-center sm:justify-start space-x-0 sm:space-x-10">
            {/* Desktop navigation items */}
            {/* Array map the buttons*/}
            {plannerButtons.map((button, index) => {
              if (button !== 'Add New Routine') {
                return (
                  <button
                    key={index}
                    className={`text-xl text-gray-500 hover:text-gray-800 focus:outline-none ${activeTab === index ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => handleTabChange(index)}
                  >
                    {button}
                  </button>
                );
              } else {
                return (
                  <div className="flex items-center mt-3 sm:mt-0" key={index}>
                    {/* Show modal button for desktop version */}
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-800 mr-2"
                      onClick={() => setShowModal(true)}
                    />
                  </div>
                );
              }
            })}
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
                className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  {/* Array map the buttons*/}
                  {plannerButtons.map((button, index) => {
                    // Map all the buttons
                    if (button !== 'Add New Routine') {
                      return (
                        <li key={index}>
                          <a
                            href="#"
                            className={`block font-bold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${activeTab === index ? 'text-blue-500' : ''}`}
                            onClick={() => handleTabChange(index)}
                          >
                            {button}
                          </a>
                        </li>
                      );
                    } else {
                      return (
                        <li  key={index}>
                          <a
                            href="#"
                            className="block font-bold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => {
                              setShowModal(true);
                            }}
                          >
                            {button}
                          </a>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Grid act as the container here */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
          {/* CardPlanner Components Hardcoded */}
          <CardPlanner />

          <CardPlanner />

          <CardPlanner />

          <CardPlanner />
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        
      />
    </div>
  );
}

export default Planner;
