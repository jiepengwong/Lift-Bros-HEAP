import React from "react";
import { useState } from "react";
import Button from "./Button";

function ExerciseExpand({ exercise }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  const [setInfo, setSetInfo] = useState([]); // Array to store weight and actual reps for each set

  const handleWeightChange = (index, event) => {
    const updatedSetInfo = [...setInfo];
    updatedSetInfo[index] = {
      ...updatedSetInfo[index],
      weight: event.target.value,
    };
    setSetInfo(updatedSetInfo);
  };

  const handleActlRepsChange = (index, event) => {
    const updatedSetInfo = [...setInfo];
    updatedSetInfo[index] = {
      ...updatedSetInfo[index],
      actualReps: event.target.value,
    };
    setSetInfo(updatedSetInfo);
  };
  console.log(setInfo);
  var routineName = "Liftbro's Upper Body Routine";
  var createdBy = "LiftBro";

  return (
    <div className="w-100">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="w-4/5 text-center font-bold text-black bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex justify-between items-center"
        type="button"
        onClick={toggleDropdown}
      >
        <p>{exercise.exerciseName}</p>
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
          <ol
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {/* Display the entered weight and actual reps for each set */}
            {exercise.targetReps.map((set, index) => (
              <li key={set}>
                {set} target reps -{" "}
                <input
                  type="number"
                  value={setInfo[index]?.weight || ""}
                  min={0}
                  onChange={(event) => handleWeightChange(index, event)}
                  placeholder="Weight (kg)"
                  className="py-2 px-3 m-2 border border-yellow-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:border-transparent"
                />{" "}
                kg -{" "}
                <input
                  type="number"
                  value={setInfo[index]?.actualReps || ""}
                  min={0}
                  onChange={(event) => handleActlRepsChange(index, event)}
                  placeholder="Reps done"
                  className="py-2 px-3 m-2 border border-yellow-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:border-transparent"
                />{" "}
                reps done
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default ExerciseExpand;
