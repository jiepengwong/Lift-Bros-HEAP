import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function CardPlanner({ routineInfo }) {
  const [expanded, setExpanded] = useState(false);
  const [routineName, setRoutineName] = useState(routineInfo.name);
  const [exerciseList, setExerciseList] = useState(routineInfo.exercises);
  const exerciseRef = useRef(null);
  const [exerciseHeight, setExerciseHeight] = useState("0px");

  useEffect(() => {
    setExerciseHeight(
      expanded ? `${exerciseRef.current.scrollHeight}px` : "0px"
    );
  }, [expanded]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="max-w-md lg:max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900 dark:text-white">
          {routineName}
        </h5>
      </a>
      {/* Place the image */}
      <img
        className="object-cover w-full h-48 mt-2 rounded-md"
        src={`data:image/png;base64,${routineInfo.image}`}
        alt="Example Image"
      />

      <div className="relative">
        <button
          className="mt-3 flex items-center font-bold text-blue-700 underline focus:outline-none"
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
        className="overflow-hidden transition-height duration-300"
        style={{ height: exerciseHeight }}
      >
        {expanded && (
          <div className="mt-4 bg-blue-100 rounded-lg p-3">
            <ul className="list-disc list-inside">
              {exerciseList.map((exercise, index) => (
                <li
                  key={index}
                  className="mb-2 text-left text-gray-700 dark:text-gray-400"
                >
                  {exercise.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-row mt-4">
        {/* Start button (mobile screen) */}
        <a
          href="#"
          className="sm:hidden flex-1 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Start Routine
        </a>
        {/* Play icon (desktop screen) */}
        <a
          href="#"
          className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-auto"
        >
          <div className=" bg-blue-700 w-6 h-6 flex justify-center items-center">
            <FontAwesomeIcon icon={faPlay} className="text-white text-lg" />
          </div>{" "}
        </a>
      </div>
    </div>
  );
}

export default CardPlanner;
