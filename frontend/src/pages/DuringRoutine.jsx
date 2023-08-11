import { useState, useEffect, useRef } from "react";
import Stopwatch from "../component/Stopwatch";
import GreyBox from "../component/GreyBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import Button from "../component/Button";
import Swal from "sweetalert2";
import ExerciseExpand from "../component/ExerciseExpand";
import { useNavigate } from "react-router-dom";
import baseAxios from "../axios/baseAxios";

function DuringRoutine() {
  const navigate = useNavigate();
  const routineNameDisplay = localStorage.getItem("routine");
  const routineJSON = JSON.parse(routineNameDisplay);

  const userName = localStorage.getItem("username");
  const processExercise = (updatedCompletedExercises, index) => {
    setCompletedExercises((prevState) => {
      const newState = [...prevState];
      newState[index] = updatedCompletedExercises;
      return newState;
    });
    // console.log(completedExercises);
  };
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const [exerciseList, setExerciseList] = useState([]);
  const [previousExerciseList, setPreviousExerciseList] = useState([]);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const handleCompleteWorkout = () => {
    setIsRunning(false);
    const workoutData = {
      username: userName,
      routineName: routineJSON.name,
      dateTimeCompleted: new Date().toJSON(),
      routineDuration: formatTime(elapsedTime),
      // caloriesBurned: caloriesBurned,
      completedExercises: completedExercises,
      createdBy: routineJSON.createdBy,
      // routineIntensity: 4,
    };
    // console.log(workoutData);
    const response = baseAxios
      .post("/completedRoutine/new", workoutData, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle the response from the backend if needed
        // get your completedRoutine ID
        const completedRoutineId = response.data.data.id;
        // set completed routine ID to local storage
        localStorage.setItem("completedRoutineId", completedRoutineId);

        console.log("Workout data sent successfully!", response);
        // Redirect to the "end" page or any other desired action
        navigate("/end");
      })
      .catch((error) => {
        // Handle any error that occurs during the API call
        console.error("Error sending workout data:", error);
      });
    // console.log(response.data);
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

  const routineName = routineJSON.name;
  const createdBy = routineJSON.createdBy;

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
              targetWeights: Array.from(
                Array(exercise.targetReps.length),
                () => 0
              ),
              actualReps: Array.from(
                Array(exercise.targetReps.length),
                () => 0
              ),
              actualWeights: Array.from(
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
    // Fetch previous routine
    baseAxios
      .get(
        `completedRoutine/recent?username=${createdBy}&routineName=${routineName}&createdBy=${createdBy}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // Set past routine of user here
        setPreviousExerciseList(response.data.data.completedExercises);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setPreviousExerciseList([]);
        }
        console.log(error);
      });
  }, []);

  const handlePlayPause = () => {
    setIsRunning((prevState) => !prevState);
  };

  const findPreviousExercise = (exerciseName) => {
    if (previousExerciseList === undefined || previousExerciseList.length === 0)
      return [];
    return previousExerciseList.find(
      (exercise) => exercise.exerciseName === exerciseName
    );
  };

  return (
    <div>
      <h1 className="text-4xl font-bold py-20 mx-auto bg-custom-image-duringroutine text-white">
        <span className=" uppercase text-yellow-300">Routine</span> -{" "}
        {routineName}
      </h1>
      <div className="flex flex-col items-center p-10 md:flex-row md:justify-evenly md:p-5">
        {/* Timer box */}
        <div className="mb-4 md:mb-0">
          <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg">
            <div className="mb-2">
              <Stopwatch elapsedTime={elapsedTime} />
            </div>
            {/* Play/Pause button */}
            <div className="flex justify-center">
              <button
                className={`bg-${isRunning ? "orange" : "green"}-500 hover:bg-${
                  isRunning ? "orange" : "green"
                }-600 text-white font-semibold py-2 px-4 rounded-full`}
                onClick={handlePlayPause}
              >
                <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          {/* Calories box */}
          <GreyBox text="Est. calories burned:" data={caloriesBurned} />
        </div>
      </div>
      {/* Exercise list */}
      {exerciseList.map((exercise, index) => (
        <div className="m-2" key={index}>
          <ExerciseExpand
            exercise={exercise}
            prevExercise={findPreviousExercise(exercise.exerciseName)}
            onChange={(updatedInfo) => processExercise(updatedInfo, index)}
          />
        </div>
      ))}

      <div className="flex justify-evenly p-20">
        {/* Complete workout */}
        <div>
          <Button text="Complete Workout" onClick={handleCompleteWorkout} />
        </div>
      </div>
    </div>
  );
}

export default DuringRoutine;
