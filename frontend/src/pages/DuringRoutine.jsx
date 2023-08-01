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
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const handleCompleteWorkout = () => {
    setIsRunning(false);
    const workoutData = {
      username: "LiftBro",
      routineName: "Liftbro's Upper Body Routine",
      dateTimeCompleted: new Date().toJSON(),
      routineDuration: elapsedTime,
      // routineIntensity: 4,
      caloriesBurned: caloriesBurned,
      // completedExercises: [],
    };
    console.log(workoutData);
    const response = axios
      .post("http://localhost:8080/completedRoutine/new", workoutData, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle the response from the backend if needed
        console.log("Workout data sent successfully!", response);
        // Redirect to the "end" page or any other desired action
      })
      .catch((error) => {
        // Handle any error that occurs during the API call
        console.error("Error sending workout data:", error);
      });
    console.log(response.data);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  // Timer
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

  // Calories calculator
  useEffect(() => {
    setCaloriesBurned(Math.floor(elapsedTime * 0.05));
  }, [elapsedTime]);

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
          <GreyBox text="Est. calories burned:" data={caloriesBurned} />
        </div>
      </div>
      {/* Exercise list */}
      {exerciseList.map((exercise) => (
        <div className="m-2">
          <ExerciseExpand exercise={exercise} />
        </div>
      ))}

      <div className="flex justify-evenly p-20">
        {/* Complete workout */}
        <div>
          {/* <Link to="/end"> */}
          <Button text="Complete Workout" onClick={handleCompleteWorkout} />
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default DuringRoutine;
