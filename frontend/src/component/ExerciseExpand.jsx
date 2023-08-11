import React from "react";
import { useState } from "react";

function ExerciseExpand({ exercise, onChange }) {
  const [completedExercises, setCompletedExercises] = useState({
    exerciseName: exercise.exerciseName,
    targetReps: exercise.targetReps,
    targetWeights: Array.from(Array(exercise.targetReps.length), () => 0),
    actualReps: Array.from(Array(exercise.targetReps.length), () => 0),
    actualWeights: Array.from(Array(exercise.targetReps.length), () => 0),
  }); // Array to store completed exercises
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  const [setInfo, setSetInfo] = useState([]); // Array to store weight and actual reps for each set

  const handleWeightChange = (index, event) => {
    const updatedCompletedExercises = { ...completedExercises };
    const updatedSetInfo = [...setInfo];
    const newWeight = parseInt(event.target.value);
    updatedSetInfo[index] = {
      ...updatedSetInfo[index],
      weight: newWeight,
    };
    if (isNaN(newWeight)) {
      updatedSetInfo[index] = {
        ...updatedSetInfo[index],
        noWeight: true,
      };
      updatedCompletedExercises.targetWeights[index] = 0;
      updatedCompletedExercises.actualWeights[index] = 0;
    } else {
      updatedSetInfo[index] = {
        ...updatedSetInfo[index],
        noWeight: false,
      };
      updatedCompletedExercises.targetWeights[index] = newWeight;
      updatedCompletedExercises.actualWeights[index] = newWeight;
      for (
        let i = index + 1;
        i < completedExercises.targetWeights.length;
        i++
      ) {
        if (
          i >= updatedSetInfo.length ||
          !("noWeight" in updatedSetInfo[i]) ||
          updatedSetInfo[i].noWeight
        ) {
          updatedSetInfo[i] = {
            ...updatedSetInfo[i],
            weight: newWeight,
          };
          updatedCompletedExercises.targetWeights[i] = newWeight;
          updatedCompletedExercises.actualWeights[i] = newWeight;
        } else if (
          !("noWeight" in updatedSetInfo[i]) ||
          updatedSetInfo[i].noWeight
        ) {
          updatedSetInfo[i] = {
            ...updatedSetInfo[i],
            weight: newWeight,
          };
          updatedCompletedExercises.targetWeights[i] = newWeight;
          updatedCompletedExercises.actualWeights[i] = newWeight;
        }
      }
    }
    setSetInfo(updatedSetInfo);
    setCompletedExercises(updatedCompletedExercises);
    onChange(updatedCompletedExercises);
  };

  const handleActlRepsChange = (index, event) => {
    const updatedCompletedExercises = { ...completedExercises };
    const updatedSetInfo = [...setInfo];
    const newRep = parseInt(event.target.value);
    updatedSetInfo[index] = {
      ...updatedSetInfo[index],
      actualReps: newRep,
    };
    if (isNaN(newRep)) {
      updatedSetInfo[index] = {
        ...updatedSetInfo[index],
        noRep: true,
      };
      updatedCompletedExercises.actualReps[index] = 0;
    } else {
      updatedSetInfo[index] = {
        ...updatedSetInfo[index],
        noRep: false,
      };
      updatedCompletedExercises.actualReps[index] = newRep;
      for (let i = index + 1; i < completedExercises.actualReps.length; i++) {
        if (
          i >= updatedSetInfo.length ||
          !("noRep" in updatedSetInfo[i]) ||
          updatedSetInfo[i].noRep
        ) {
          updatedSetInfo[i] = {
            ...updatedSetInfo[i],
            actualReps: newRep,
          };
          updatedCompletedExercises.actualReps[i] = newRep;
        } else if (!("noRep" in updatedSetInfo[i]) || updatedSetInfo[i].noRep) {
          updatedSetInfo[i] = {
            ...updatedSetInfo[i],
            actualReps: newRep,
          };
          updatedCompletedExercises.actualReps[i] = newRep;
        }
      }
    }
    setSetInfo(updatedSetInfo);
    setCompletedExercises(updatedCompletedExercises);
    onChange(updatedCompletedExercises);
  };

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
        <div className="fade-in-dropdown">
          <ol
            className="py-2 text-sm text-gray-700 space-y-2"
            aria-labelledby="dropdownDefaultButton"
          >
            {/* Display the entered weight and actual reps for each set */}
            {exercise.targetReps.map((set, index) => (
              <li
                key={index}
                className="flex flex-col md:flex-row md:items-center justify-center"
              >
                <div className="mb-2 md:mb-0 font-semibold text-md md:text-md">
                  SET {index + 1} - {set} target reps
                </div>
                <div className="flex-grow md:flex-grow-0">
                  <input
                    type="number"
                    value={setInfo[index]?.weight || ""}
                    min={0}
                    onChange={(event) => handleWeightChange(index, event)}
                    placeholder="Weight (kg)"
                    className="py-2 px-3 m-2 border border-yellow-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:border-transparent"
                  />
                  <span className="ml-0">Kg</span>
                </div>
                <div className="flex-grow md:flex-grow-0">
                  <input
                    type="number"
                    value={setInfo[index]?.actualReps || ""}
                    min={0}
                    onChange={(event) => handleActlRepsChange(index, event)}
                    placeholder="Reps done"
                    className="py-2 px-3 m-2 border border-yellow-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:border-transparent"
                  />{" "}
                  <span className="ml-0">Reps</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default ExerciseExpand;
