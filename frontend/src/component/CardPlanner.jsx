import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCaretDown, faTrash, faTimes, faCaretUp} from "@fortawesome/free-solid-svg-icons";

function CardPlanner({ routineInfo, deleteCard }) {
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
    deleteCard(routineInfo.createdBy, routineInfo.name);
    // Implement your delete routine logic here
    // You can use routineInfo.id or other identifiers
    // to delete the routine associated with this card.
  };

  return (
    <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-md relative">
      <div className="mb-4 w-full relative rounded-t-md overflow-hidden aspect-w-16 aspect-h-9">
        {localStorage.getItem("username") === routineInfo.createdBy && (
          <button
            onClick={deleteRoutine}
            className="absolute top-2 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-300"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
        <img
          className="object-cover w-full h-full"
          src={`data:image/png;base64,${routineInfo.image}`}
          alt="Routine Preview"
        />
      </div>

      <div className="px-7 pb-7">
        <a href="#" className="mb-2 block text-gray-900 dark:text-white">
          <h5 className="text-xl text-start font-bold tracking-tight w-full overflow-hidden">
            {routineInfo.name}
          </h5>
        </a>

        {localStorage.getItem("username") !== routineInfo.createdBy && (
          <button className="flex flex-start bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full">
            <p className="text-sm">
              Created by: {routineInfo.createdBy}
            </p>
          </button>
        )}

        <div className="relative w-full mt-2 px-1">
        <button
  className={`flex items-center font-semibold text-blue-700 hover:text-blue-800 transition-colors focus:outline-none ${
    expanded ? "underline" : ""
  }`}
  onClick={toggleExpand}
>
  {expanded ? (
    <span className="flex items-center">
      Hide Exercises 
      <FontAwesomeIcon icon={faCaretUp} className="ml-1" />
    </span>
  ) : (
    <span className="flex items-center">
      Show Exercises
      <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
    </span>
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
    </div>
  );
}

export default CardPlanner;
