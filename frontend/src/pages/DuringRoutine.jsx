import { useState } from "react";
import { useEffect, useRef } from "react";
import Stopwatch from "../component/Stopwatch";
import GreyBox from "../component/GreyBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStop,
  faPlusCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../component/Button";
import { Link } from "react-router-dom";
import axios from "axios";

function DuringRoutine() {
  const [exerciseList, setExerciseList] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [expanded, setExpanded] = useState(false);
  // const contentRef = useRef(null);
  // const [exerciseHeight, setExerciseHeight] = useState("0px");
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  // useEffect(() => {
  //   setExerciseHeight(
  //     expanded ? `${exerciseRef.current.scrollHeight}px` : "0px"
  //   );
  // }, [expanded]);

  // const toggleExpand = () => {
  //   setExpanded(!expanded);
  // };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  var routineName = "Liftbro's Back Upper Body Routine";
  var createdBy = "LiftBro";

  // Fetch routine from Database
  useEffect(() => {
    // Fetch data from database
    // Fetch routine
    axios
      .get(
        `http://localhost:8080/routine/find?username=${createdBy}&name=${routineName}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // Get routines of user here
        setExerciseList(response.data.exercises);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePlayPause = () => {
    setIsRunning((prevState) => !prevState);
  };

  // const handleStop = () => {
  //   setIsRunning(false);
  //   setElapsedTime(0);
  // };

  return (
    <div>
      <div className="flex justify-evenly p-20">
        {/* First box */}
        <div>
          <div className="flex flex-col justify-center bg-gray-200 p-4 rounded-lg">
            <div>
              <Stopwatch elapsedTime={elapsedTime} />
            </div>
            {/* Play/Pause button */}
            <br></br>
            <div className="flex justify-center">
              {!isRunning && (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full"
                  onClick={handlePlayPause}
                >
                  <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
                </button>
              )}

              {isRunning && (
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full"
                  onClick={handlePlayPause}
                >
                  <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
                </button>
              )}

              {/* <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full"
            onClick={handleStop}
            >
            <FontAwesomeIcon icon={faStop} />
          </button> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {/* Second box */}
          <GreyBox text="Est. calories burnt:" data="350 kJ" />
        </div>
        <Link to="/end">
          <Button text="Complete Workout" />
        </Link>
      </div>
      {exerciseList.map((exercise) => (
        <div>
          <div
          // className="sm:hidden relative inline-block"
          >
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={toggleDropdown}
            >
              Dropdown button{" "}
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
          </div>
          {dropdownOpen && (
            <div>
              <div
                id="dropdown"
                className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                {exercise.exerciseName}
              </div>
              <ol
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                {exercise.targetReps.map((set) => (
                  <li>{set}kg</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DuringRoutine;
