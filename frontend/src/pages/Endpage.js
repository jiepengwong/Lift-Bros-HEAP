import React, { useEffect, useState } from "react";
import GreyBox from "../component/GreyBox";
import StarRating from "../component/StarRating";
import Notes from "../component/Notes";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import baseAxios from "../axios/baseAxios";

function Endpage() {
  // grab your completed routine id from local storage
  const navigate = useNavigate();
  const displayCompletedRoutineId = localStorage.getItem("completedRoutineId");
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [routineDuration, setRoutineDuration] = useState("");
  const [routineName, setRoutineName] = useState("");
  const [intensity, setIntensity] = useState(0);
  // get the completed routine from the backend using completed routine id
  useEffect(() => {
    baseAxios
      .get(`/completedRoutine/${displayCompletedRoutineId}`, {
        withCredentials: true,
      })
      .then((response) => {
        const completedRoutineNoStar = response.data.data;
        console.log("Workout data retrieved", completedRoutineNoStar);
        // get the routine name, routine duration, and routine calories burned from the backend and assign to variable
        setRoutineName(completedRoutineNoStar.routineName);
        setCaloriesBurned(completedRoutineNoStar.caloriesBurned);
        setRoutineDuration(completedRoutineNoStar.routineDuration);
      })
      .catch((error) => {
        // Handle any error that occurs during the API call
        console.error("Error retrieving workout data:", error);
      });
  }, []);

  // create function to update the completed routine intensity
  const processStar = (starInfo) => {
    setIntensity(starInfo);
  };
  // use post request to update the completed routine intensity
  const updateRoutineAndNavigate = () => {
    baseAxios
      .put(`/completedRoutine/${displayCompletedRoutineId}`, {
        routineIntensity: intensity,
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
        {/* <Link to="/"> */}
        <Button text="Save & back to home" onClick={updateRoutineAndNavigate} />
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Endpage;
