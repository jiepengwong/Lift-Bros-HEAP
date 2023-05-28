import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// Components
import CardPlanner from '../component/CardPlanner';
function Planner() {
  return (
    <div>
      <div>
        {/* Planner page */}


        <h1 class="text-2xl lg:text-4xl font-bold text-center m-10 p-2">Welcome to the Planner Page</h1>


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