import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const CardHistory = ({histories}) => {

    return (
        <div className="grid md:grid-cols-2 gap-10 lg:grid-cols-4 gap-10 place-items-center py-10">
            {histories.map((history) =>(
                <div className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-left text-gray-900 dark:text-white">{history.date}</h5>
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-left text-gray-900 dark:text-white">{history.routinename}</h5>
                </a>
                <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-200">Exercises Done:</p>
                <ul className ="list-disc space-x-2 grid grid-cols-1">
                    {history.exercises.map((exercise) => (

                        <li className=" mb-3 font-normal text-start text-gray-700 dark:text-gray-200 ml-2">{exercise}</li>

                    )
                    
                    
                    ) }
                </ul>
                <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-400">Duration: {history.duration}</p>
                <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-400">Calories Burnt: {history.calories}</p>
                <div className="flex flex-row">
                </div>
                </div>
            ))}
        </div>
        
        )
}

export default CardHistory