import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlusCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// Import components
import Modal from '../component/Modal';

// Components
import CardPlanner from '../component/CardPlanner';

function Planner() {
  const navigate = useNavigate();
  // Template buttons
  const [plannerButtons, setPlannerButtons] = useState([
    'Favourites',
    'Routines',
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
  const [routineName, setRoutineName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleRoutineNameChange = (event) => {
    setRoutineName(event.target.value);
  };

  const handleSaveRoutine = () => {
    // Perform the necessary actions with the routine name, e.g., save it to the database
    console.log('Saving routine:', routineName);

    // Close the modal and clear the routine name
    setShowModal(false);
    setRoutineName('');
  };
  // ------------------------------


  // Redirect to create routine page
  const handleCreateRoutine = () => {
    // Redirect to create routine page
    alert('redirect to routine page');
    // Popup modal to create routine

    navigate('/createRoutine');
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  // Fake dummy
  const templateOptions = [
    { id: 1, name: 'Template 1' },
    { id: 2, name: 'Template 2' },
    { id: 3, name: 'Template 3' },
    // Add more template options as needed
  ];

  // Need to account for content display based on the active tab

  // Database data

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
        routineName={routineName}
        handleRoutineNameChange={handleRoutineNameChange}
        handleSaveRoutine={handleSaveRoutine}
      />


      {/* Logic flow */}
      {/* 1. User to key in routine name, select template */}
      {/* 2. Store in redux  */}
      {/* 3. Redirect to the create routine page */}
      {/* 4. At create new routine page, display - 1. Routine Name, 2. Templates, with certain preloaded exercises in saved; (This can be the exercise ID) 
       */}
       {/* 5. At create new routine pages, can have 3 selection. 1 section - For search bar, 2 section - Selected exercises for routine ; 3 section - results for exercises */}
    </div>
  );
}

export default Planner;
