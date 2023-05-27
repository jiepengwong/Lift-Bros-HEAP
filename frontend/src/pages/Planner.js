import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function Planner() {
  return (
    <div>
      <div>
        {/* Planner page */}

        <h1 class="text-4xl font-bold">Planner</h1>


        {/* card */}
        {/* Using grid */}

        {/* 4 cards desktop */}
        {/* 2 cards tablet */}
        {/* 1 card mobile */}
        <div class="flex flex-col items-center">
          {/* 1st card */}

          {/* Duplicate this a few times using map */}
          {/* Card */}



          <div className="max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900 dark:text-white">Example Routine</h5>
            </a>
            {/* Place the image */}
            <img className="object-cover w-full h-48 mt-2 rounded-md" src="https://images.unsplash.com/photo-1626198682884-4b7b2b5b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwc2NpZW5jZSUyMGFjdGl2aXR5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="Example Image" />
            <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order. Testing 123456789</p>
            <div className="flex flex-row">
              {/* Desktop screen */}
              <a href="#" className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-center justify--end items-end text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-auto">
                More details
              </a>
              {/* Play icon  */}

              <a href="#" className="sm:hidden inline-flex px-3 py-2 text-sm font-medium text-center justify--end items-end text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-auto">
                  <FontAwesomeIcon icon={faPlay} />
              </a>

            </div>
          </div>




          {/* Card */}
          {/* <div class="max-w-sm  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
          </div> */}

        </div>



      </div>
    </div>
  )
}

export default Planner