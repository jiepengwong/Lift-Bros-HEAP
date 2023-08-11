import React from "react";
import { useEffect, useState } from "react";

function ModalExerciseSets({ isOpen, onClose, handleEditExercise, exercise }) {
  const [sets, setSets] = useState([]);
  const [reps, setReps] = useState([]);

  useEffect(() => {
    // Lock scroll when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSets(exercise.sets);
      setReps(exercise.reps);
    } else {
      // Restore scroll when the modal is closed
      document.body.style.overflow = "auto";
    }

    return () => {
      // Restore scroll when the component is unmounted
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="bg-gray-800 opacity-75 fixed inset-0"
          onClick={onClose}
        ></div>
        <div className="w-4/5 h-4/5 max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-1 overflow-y-auto z-10">
          <div className="max-h-full overflow-y-auto modal-content">
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Workout image */}

                {/* Workout details */}
                <div className="col-span-2">
                  <h1 className="text-2xl font-bold mb-4">
                    Exercise name: {exercise.exerciseName}
                  </h1>

                  <img
                    className="object-cover w-full h-64 rounded"
                    src={require("../assets/testingGym.webp")}
                    alt="Workout Image"
                  />
                  <div className="col-span-2">
                    <h2 className="text-lg font-semibold mb-2">
                      Exercise Description
                    </h2>
                    <p>{exercise.description}</p>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">
                      Sets and Reps
                    </h2>

                    <div className="grid  gap-4">
                      <form className="grid grid-cols-2 gap-4">
                        {/* Sets */}
                        <div className="flex flex-col">
                          <label
                            htmlFor="sets"
                            className="mb-1 font-medium text-gray-700 dark:text-gray-400"
                          >
                            Sets:
                          </label>
                          <input
                            id="sets"
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            type="number"
                            required
                            placeholder="Enter sets"
                            onChange={(e) => setSets(e.target.value)}
                            min="1"
                          />
                        </div>

                        {/* Reps */}
                        <div className="flex flex-col">
                          <label
                            htmlFor="reps"
                            className="mb-1 font-medium text-gray-700 dark:text-gray-400"
                          >
                            Reps:
                          </label>
                          <input
                            id="reps"
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            type="number"
                            required
                            placeholder="Enter reps"
                            onChange={(e) => setReps(e.target.value)}
                            min="1"
                          />
                        </div>

                        <div className="col-span-2 flex justify-end">
                          <button
                            className="bg-green-600 hover:bg-green-300 text-white rounded px-4 py-2"
                            onClick={() =>
                              handleEditExercise(exercise, sets, reps)
                            }
                            type="submit"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalExerciseSets;
