import { useState } from "react";
import { useEffect } from "react";
import Stopwatch from "../component/Stopwatch";
import GreyBox from "../component/GreyBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";
import Button from "../component/Button";
import { Link } from "react-router-dom";

function DuringRoutine() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

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

  const handlePlayPause = () => {
    setIsRunning((prevState) => !prevState);
  };

  // const handleStop = () => {
  //   setIsRunning(false);
  //   setElapsedTime(0);
  // };

  return (
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
      {/* Second box */}
      <div className="flex flex-col justify-center">
        <GreyBox text="Est. calories burnt:" data="350 kJ" />
      </div>
      <Link to="/end">
        <Button text="Complete Workout" />
      </Link>
    </div>
  );
}

export default DuringRoutine;
