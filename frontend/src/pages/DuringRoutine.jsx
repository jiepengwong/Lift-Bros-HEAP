import { useState, useEffect, useRef } from "react";
import Stopwatch from "../component/Stopwatch";
import GreyBox from "../component/GreyBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import Button from "../component/Button";
import Swal from "sweetalert2";
import axios from "axios";
import ExerciseExpand from "../component/ExerciseExpand";
import { Link } from "react-router-dom";
import baseAxios from "../axios/baseAxios";

function DuringRoutine() {
  const routineNameDisplay = localStorage.getItem("routine");
  console.log(routineNameDisplay);
  const userName = localStorage.getItem("username");
  const processExercise = (updatedCompletedExercises, index) => {
    setCompletedExercises((prevState) => {
      const newState = [...prevState];
      newState[index] = updatedCompletedExercises;
      return newState;
    });
    console.log(completedExercises);
  };
  const [exerciseList, setExerciseList] = useState([]);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const handleCompleteWorkout = () => {
    setIsRunning(false);
    const workoutData = {
      username: userName,
      routineName: "Liftbro's Upper Body Routine",
      dateTimeCompleted: new Date().toJSON(),
      routineDuration: elapsedTime,
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
    Swal.fire({
      title: "Success!",
      text: "You have completed your routine!",
      icon: "success",
      confirmButtonText: "Cool",
    });
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

  const routineName = "Liftbro's Upper Body Routine";
  const createdBy = userName;

  // Calories calculator
  useEffect(() => {
    setCaloriesBurned(Math.floor(elapsedTime * 0.05));
  }, [elapsedTime]);

  // Fetch routine from Database
  useEffect(() => {
    // Fetch data from database
    // Fetch routine
    baseAxios
      .get(`routine/find?username=${createdBy}&name=${routineName}`, {
        withCredentials: true,
      })
      .then((response) => {
        // Get routines of user here
        setExerciseList(response.data.exercises);
        setCompletedExercises(
          response.data.exercises.map((exercise) => {
            return {
              exerciseName: exercise.exerciseName,
              targetReps: exercise.targetReps,
              targetWeight: Array.from(
                Array(exercise.targetReps.length),
                () => 0
              ),
              actualReps: Array.from(
                Array(exercise.targetReps.length),
                () => 0
              ),
              actualWeight: Array.from(
                Array(exercise.targetReps.length),
                () => 0
              ),
            };
          })
        );
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
      <h1 className="text-3xl font-bold mb-4 mt-20 mx-auto">Routine name</h1>
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
      {exerciseList.map((exercise, index) => (
        <div className="m-2" key={index}>
          <ExerciseExpand
            exercise={exercise}
            onChange={(updatedInfo) => processExercise(updatedInfo, index)}
          />
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
