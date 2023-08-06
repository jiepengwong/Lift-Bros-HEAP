import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

function HomePage() {
  const loginUser = useSelector((state) => state.login.loginUser);
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Calories burnt (kcal)",
              data: [1.2, 1.6, 1.85, 2.04, 2.6, 2.4, 2],
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
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-4">
          Welcome back, {loginUser.username}!
        </h1>
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
        <canvas ref={chartRef}></canvas>
      </section>
    </div>
  );
}

export default HomePage;
