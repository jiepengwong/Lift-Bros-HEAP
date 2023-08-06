import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import baseAxios from "../axios/baseAxios";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../component/Button";

function HomePage() {
  const userName = localStorage.getItem("username");
  const [chartLabels, setChartLabels] = useState({});
  const [weekOffset, setWeekOffset] = useState(0);
  const chartRef = useRef(null);
  let chartInstance = null;
  const viewPrevWeek = (offset) => {
    setWeekOffset(weekOffset + offset);
    baseAxios
      .get(
        `/completedRoutine/pastWeek?weekOffset=${weekOffset}&username=${userName}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Testing base axios - SUCCESS");
        setChartLabels(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Testing base axios - ERROR");
      });
  };

  useEffect(() => {
    viewPrevWeek(0);
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const createChart = () => {
      console.log(chartLabels);
      const chartLabelsArray =
        Object.keys(chartLabels).length !== 0
          ? Object.values(chartLabels.caloriesBurnedPerDay)
          : [];
      console.log(chartLabelsArray);
      const dateLabels = chartLabelsArray.map((label) => label.date);
      console.log(dateLabels);
      const caloriesBurntData = chartLabelsArray.map(
        (label) => label.caloriesBurned
      );
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: dateLabels,
          datasets: [
            {
              label: "Calories burnt (cal)",
              data: caloriesBurntData,
              backgroundColor: "rgb(255,199,0)",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };

    destroyChart(); // Destroy previous chart instance
    createChart(); // Create new chart instance

    return () => {
      destroyChart(); // Clean up the chart instance when the component unmounts
    };
  }, [chartLabels]);

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-4">Welcome back, {userName}!</h1>
      </div>
      <section className="max-w-3xl mx-auto">
        <p className="text-gray-600 mb-6">
          You have scheduled "Back and Legs Workout" today, let's get started!
        </p>
        <h2 className="text-xl font-bold mb-4">Exercises</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold">Squat</h3>
            <p className="text-gray-600">4 sets of 60kg</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold">Deadlift</h3>
            <p className="text-gray-600">4 sets of 60kg</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold">Glute kickback</h3>
            <p className="text-gray-600">4 sets of 50kg</p>
          </div>
          {/* Add more exercise cards here */}
        </div>
      </section>
      <section className="max-w-3xl mx-auto mt-20">
        <p className="text-gray-600 mb-6">
          Look back on your exercise statistics this week
        </p>

        <div className="flex justify-between">
          <button
            onClick={() => viewPrevWeek(1)}
            className="bg-gray-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full ml-2"
          >
            <FontAwesomeIcon icon={faCaretLeft} />
          </button>
          <button
            {...(weekOffset === 0 && { hidden: true })}
            onClick={() => viewPrevWeek(-1)}
            className="bg-gray-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full ml-2"
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
        </div>
        <canvas ref={chartRef}></canvas>
      </section>
    </div>
  );
}

export default HomePage;
