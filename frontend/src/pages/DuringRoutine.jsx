import { useState, useEffect, useRef } from "react";
import Stopwatch from "../component/Stopwatch";
import GreyBox from "../component/GreyBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import Button from "../component/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import ExerciseExpand from "../component/ExerciseExpand";

function DuringRoutine() {
  const [exerciseList, setExerciseList] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

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

  var routineName = "Liftbro's Upper Body Routine";
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

  return (
    <div>
      <div className="flex justify-evenly p-20">
        {/* Timer box */}
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
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {/* Calories box */}
          <GreyBox text="Est. calories burnt:" data="350 kJ" />
        </div>
        {/* Go to home button */}
        {/* <Link to="/end">
          <Button text="Complete Workout" />
        </Link> */}
      </div>
      {exerciseList.map((exercise) => (
        <div className="m-2">
          <ExerciseExpand exercise={exercise} />
        </div>
      ))}
      <div className="flex justify-evenly p-20">
        {/* Timer box */}
        <div>
          <Link to="/end">
            <Button text="Complete Workout" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DuringRoutine;
