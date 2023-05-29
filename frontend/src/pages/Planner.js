import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// Components
import CardPlanner from '../component/CardPlanner';
function Planner() {

  // Active tab state
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  // Need to account for content display based on the active tab


  // Database data 

  return (
    <div>
      <div>
        {/* Planner page */}


        <h1 class="text-xl sm:text-lg lg:text-4xl font-bold text-center m-10 p-2">Welcome to the Planner Page</h1>

        {/* Tab bar to filter between my Routines, favourites and other people routines */}
        <div className="flex justify-center mb-11">
          <nav className="flex space-x-10">
            <button
              className={`text-xl text-gray-500 hover:text-gray-800 focus:outline-none ${activeTab === 0 ? 'border-b-2 border-blue-500' : ''
                }`}
              onClick={() => handleTabChange(0)}
            >
              My Routines
            </button>
            <button
              className={`text-xl text-gray-500 hover:text-gray-800 focus:outline-none ${activeTab === 1 ? 'border-b-2 border-blue-500' : ''
                }`}
              onClick={() => handleTabChange(1)}
            >
              My Favourites
            </button>
            <button
              className={` text-xl text-gray-500 hover:text-gray-800 focus:outline-none ${activeTab === 2 ? 'border-b-2 border-blue-500' : ''
                }`}
              onClick={() => handleTabChange(2)}
            >
              Other Routines
            </button>
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
  )
}

export default Planner