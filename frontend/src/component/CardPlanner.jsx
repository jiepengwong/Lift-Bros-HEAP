import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function CardPlanner() {
    return (
        <div className="max-w-md lg:max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900 dark:text-white">Example Routine</h5>
            </a>
            {/* Place the image */}
            <img className="object-cover w-full lg:h-48 mt-2 rounded-md" src={require("../assets/testingGym.webp")} alt="Example Image" />
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
        
        )
}

export default CardPlanner