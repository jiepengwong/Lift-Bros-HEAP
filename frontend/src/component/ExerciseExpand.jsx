import React from "react";
import { useState } from "react";
import Button from "./Button";
function ExerciseExpand({ exercise }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  var routineName = "Liftbro's Upper Body Routine";
  var createdBy = "LiftBro";
  return (
    <div
      className="w-100"
      // className="sm:hidden relative inline-block"
    >
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="w-4/5 text-center font-bold text-black  bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex justify-between items-center"
        type="button"
        onClick={toggleDropdown}
      >
        <p>{exercise.exerciseName} </p>
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {dropdownOpen && (
        <div>
          {/* <div
            id="dropdown"
            className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            {exercise.exerciseName}
          </div> */}
          <ol
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {exercise.targetReps.map((set) => (
              <li>{set} reps</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default ExerciseExpand;
