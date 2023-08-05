import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCaretDown, faTrash, faTimes  } from "@fortawesome/free-solid-svg-icons";

function CardPlanner({ routineInfo }) {
  console.log(routineInfo);
  const [expanded, setExpanded] = useState(false);
  const [exerciseList, setExerciseList] = useState(routineInfo.exercises);
  const exerciseRef = useRef(null);
  const [exerciseHeight, setExerciseHeight] = useState("0px");

  useEffect(() => {
    setExerciseHeight(expanded ? `${exerciseRef.current.scrollHeight}px` : "0px");
  }, [expanded]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const deleteRoutine = () => {
    console.log("delete routine")
    // Implement your delete routine logic here
    // You can use routineInfo.id or other identifiers
    // to delete the routine associated with this card.
  };

  return (
    <div className="max-w-md w-full p-7 bg-white border border-gray-200 rounded-lg shadow-md relative">
      {localStorage.getItem("username") === routineInfo.createdBy && (
        <div className="p-2">
    <button
  onClick={deleteRoutine}
  className="absolute top-2 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-300"
>
  <FontAwesomeIcon icon={faTimes} />
</button>
      </div>
      )}
      <div className="mb-4 h-35 w-full">
        <img
          className="object-fit w-full h-40 rounded-md"
          src={`data:image/png;base64,${routineInfo.image}`}
          alt="Routine Preview"
        />
      </div>

      <a href="#" className="mb-2 block text-gray-900 dark:text-white">
        <h5 className="text-xl text-start font-bold tracking-tight w-full overflow-hidden">
          {routineInfo.name}
        </h5>
      </a>

      <div className="relative w-full">
        <button
          className="flex items-center font-bold text-blue-700 underline focus:outline-none"
          onClick={toggleExpand}
        >
          {expanded ? (
            <>Hide Exercises</>
          ) : (
            <>
              Show Exercises
              <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
            </>
          )}
        </button>
        {expanded && (
          <div
            className="absolute top-0 left-0 w-full h-full z-10"
            onClick={toggleExpand}
          ></div>
        )}
      </div>

      <div
        ref={exerciseRef}
        className="overflow-hidden transition-height duration-300 w-full"

        style={{ height: exerciseHeight }}
      >
        <div className="mt-4 bg-blue-100 rounded-lg p-4">
          <p className="font-bold text-start">Exercise Name</p>
          <ul className="list-disc list-inside">
            {exerciseList.map((exercise, index) => (
              <li
                key={index}
                className="text-start text-gray-700 dark:text-gray-400"
              >
                {exercise.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardPlanner;
