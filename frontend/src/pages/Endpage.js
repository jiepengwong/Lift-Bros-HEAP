import React, { useState } from "react";
import GreyBox from "../component/GreyBox";
import StarRating from "../component/StarRating";
import Notes from "../component/Notes";
import Button from "../component/Button";
import { Link } from "react-router-dom";
import baseAxios from "../axios/baseAxios";

function Endpage() {
  // grab your completed routine id from local storage
  const displayCompletedRoutineId = localStorage.getItem("completedRoutineId");
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [routineDuration, setRoutineDuration] = useState("");
  const [routineName, setRoutineName] = useState("");
  // get the completed routine from the backend using completed routine id
  const response = baseAxios
    .get(`/completedRoutine/${displayCompletedRoutineId}`, {
      withCredentials: true,
    })
    .then((response) => {
      const completedRoutineNoStar = response.data.data;
      console.log("Workout data retrieved", completedRoutineNoStar);
      // get the routine name, routine duration, and routine calories burned from the backend and assign to variable
      const routineName = completedRoutineNoStar.routineName;
      setRoutineName(completedRoutineNoStar.routineName);
      console.log("rn", routineName);

      const caloriesBurned = completedRoutineNoStar.caloriesBurned;
      setCaloriesBurned(completedRoutineNoStar.caloriesBurned);
      console.log("rc", caloriesBurned);

      const routineDuration = completedRoutineNoStar.routineDuration;
      console.log("rd", routineDuration);
      setRoutineDuration(completedRoutineNoStar.routineDuration);
    })
    .catch((error) => {
      // Handle any error that occurs during the API call
      console.error("Error retrieving workout data:", error);
    });

  // create function to update the completed routine intensity
  const processStar = (starInfo) => {};
  // use post request to update the completed routine intensity

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl sm:text-lg lg:text-3xl font-bold text-center m-2 p-4">
        Congratulations, you have just completed {routineName}! 🎉
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="mr-4">
          <GreyBox text="Total time elapsed:" data={routineDuration} />
        </div>
        <div className="ml-4">
          <GreyBox
            text="Total est. calories burnt:"
            data={`${caloriesBurned} kcals`}
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <StarRating onChange={(starInfo) => processStar(starInfo)} />
        </div>
        <div className="col-span-2">
          <Notes />
        </div>
      </div>

      <div className="flex justify-center p-4">
        <Link to="/">
          <Button text="Save & back to home" />
        </Link>
      </div>
    </div>
  );
}

export default Endpage;
