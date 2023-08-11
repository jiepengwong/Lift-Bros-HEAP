import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const CardHistory = ({ histories }) => {
  console.log(histories);

  return (
    <div className="grid md:gap-10 lg gap-10 place-items-center py-10">
      <div className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        {/* <a href="#"> */}
        <h5 className="mb-2 text-lg font-bold tracking-tight text-left text-gray-900 dark:text-white">
          {histories.dateTimeCompleted.slice(0, 10)}
        </h5>
        <h5 className="mb-2 text-lg font-bold tracking-tight text-left text-gray-900 dark:text-white">
          {histories.routineName}
        </h5>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            className={`text-gray-400 text-3xl ${
              value <= histories.routineIntensity
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
        {/* </a> */}
        <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-200">
          Exercises Done:
        </p>
        <ul className="list-disc space-x-2 grid grid-cols-1">
          {histories.completedExercises.map((exercise) => (
            <li className=" mb-3 font-normal text-start text-gray-700 dark:text-gray-200 ml-2">
              {exercise.exerciseName}
            </li>
          ))}
        </ul>
        <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-400">
          Duration: {histories.routineDuration}
        </p>
        <p className="mb-3 font-normal text-start text-gray-700 dark:text-gray-400">
          Calories Burnt: {histories.caloriesBurned}
        </p>
        <div className="flex flex-row"></div>
      </div>
    </div>
  );
};

export default CardHistory;
