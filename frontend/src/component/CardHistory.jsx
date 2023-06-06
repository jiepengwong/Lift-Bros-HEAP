import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function CardHistory() {
    return (
        <div className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-left text-gray-900 dark:text-white">Date</h5>
                <h5 className="mb-2 text-lg font-bold tracking-tight text-left text-gray-900 dark:text-white">Exercise Completed:</h5>
            </a>
            <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-200">ExerciseName 1</p>
            <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-200">ExerciseName 2</p>
            <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-200">ExerciseName 3</p>
            <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-200">ExerciseName 4</p>
            <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-200">ExerciseName 5</p>

            <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-400">Exercises: 5</p>
            <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-400">Duration: 2 hours</p>
            <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-400">Calories Burnt 240 KJ</p>
            <div className="flex flex-row">
            </div>
        </div>
        
        )
}

export default CardHistory