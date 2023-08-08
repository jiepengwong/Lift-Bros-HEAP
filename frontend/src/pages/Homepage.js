import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import baseAxios from "../axios/baseAxios";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import Loading from "../component/Loading";

function HomePage() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("username");

  const [allRecommendedRoutines, setAllRecommendedRoutines] = useState({});
  const getAllRecommendedRoutines = () => {
    baseAxios
      .get("/routine/templates", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Testing base axios - SUCCESS");
        console.log(response.data);
        setAllRecommendedRoutines(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Testing base axios - ERROR");
      });
  };

  // const getOneRecommendedRoutine = (allRecommendedRoutines) => {
  //   const keys = Object.keys(recommendedRoutines);
  //   if (keys.length > 0) {
  //     const randomKey = Math.floor(keys[(keys.length * Math.random())]);}

  const [chartLabels, setChartLabels] = useState({});
  const [weekOffset, setWeekOffset] = useState(0);
  const [recommendedRoutines, setRecommendedRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null);
  let chartInstance = null;
  const viewPrevWeek = (offset) => {
    baseAxios
      .get(
        `/completedRoutine/pastWeek?weekOffset=${
          weekOffset + offset
        }&username=${userName}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setWeekOffset(weekOffset + offset);
        setChartLabels(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const generateRandomIndex = (max, len) => {
    var arr = [];
    while (arr.length < len) {
      var r = Math.floor(Math.random() * max);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  };
  const getRecommendedRoutines = () => {
    baseAxios
      .get(`/routine/templates`, {
        withCredentials: true,
      })
      .then((response) => {
        const routines = response.data.data;
        const maxRecommendedRoutines = 3;
        const recommendedRoutinesIndex = generateRandomIndex(
          routines.length,
          maxRecommendedRoutines
        );
        const tempReco = [];
        recommendedRoutinesIndex.forEach((index) => {
          if (recommendedRoutines.length < maxRecommendedRoutines) {
            tempReco.push(routines[index]);
          }
        });
        if (tempReco.length !== 0) {
          setRecommendedRoutines(tempReco);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    viewPrevWeek(0);
    getRecommendedRoutines();
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const createChart = () => {
      const chartLabelsArray =
        Object.keys(chartLabels).length !== 0
          ? Object.values(chartLabels.caloriesBurnedPerDay)
          : [];
      const dateLabels = chartLabelsArray.map((label) => label.date);
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
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="max-w-3xl mx-auto mt-20">
            <h1 className="text-3xl font-bold mb-4">
              Welcome back, {userName}!
            </h1>
          </div>
          <section className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-6">
              Let's start Lifting Bro! Choose from some of our recommended
              routines
            </p>
            <h2 className="text-xl font-bold mb-4">Recommended Routines</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedRoutines.map((routine) => {
                return (
                  <div
                    className="bg-white rounded shadow p-4 flex flex-col justify-between items-center"
                    key={routine.name}
                  >
                    <h3 className="text-lg font-semibold">{routine.name}</h3>
                    <div className="aspect-w-3 aspect-h-4">
                      <img
                        className="object-cover w-full h-full"
                        src={`data:image/png;base64,${routine.image}`}
                        alt="Routine Preview"
                      />
                    </div>
                    <Button
                      text="Start Lifting"
                      onClick={() => {
                        localStorage.setItem(
                          "routine",
                          JSON.stringify(routine)
                        );
                        navigate("/during");
                      }}
                    />
                  </div>
                );
              })}
              <div
                className="bg-white rounded shadow p-4 flex flex-col justify-between items-center"
                key="Others"
              >
                <h3 className="text-lg font-semibold">Other Gains</h3>
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    className="object-cover w-full h-full"
                    src={require("../assets/tyler1.jpg")}
                    alt="Routine Preview"
                  />
                </div>
                <Button
                  text="Other Routines"
                  onClick={() => {
                    navigate("/routine");
                  }}
                />
              </div>
              {/* <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold">Squat</h3>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold">Squat</h3>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold">Glute kickback</h3>
            <p className="text-gray-600">4 sets of 50kg</p>
          </div> */}
              {/* Add more exercise cards here */}
            </div>
          </section>
        </div>
      )}
      <section className="max-w-3xl mx-auto mt-20">
        <p className="text-gray-600 mb-6">
          Look back on your exercise statistics
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
