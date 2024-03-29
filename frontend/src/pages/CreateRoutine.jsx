import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Searchbar from "../component/Searchbar";
import ModalExerciseSets from "../component/ModalExerciseSets";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import CreateRoutineCard from "../component/CreateRoutineCard";
import defaultImage from "../assets/tyler1.jpg"; // Import the default image
import Swal from "sweetalert2";
import Loading from "../component/Loading";
import {
  faPlay,
  faPlusCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import ModalSearchResults from "../component/ModalSearchResults";

import baseAxios from "../axios/baseAxios";
function CreateRoutine() {
  const navigate = useNavigate();
  const [routineDescription, setRoutineDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    baseAxios
      .get("/exercise")
      .then((response) => {
        console.log("Testing base axios - SUCCESS");
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        console.log("Testing base axios - ERROR");
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: "Something went wrong! Error message: " + error.message,
        });
      });
    console.log("Testing base axios");
  }, []);

  // Use Selector to get the routine details from the redux store (Dispatched from Modal)
  const routineDetails = useSelector((state) => state.routine.routineDetails);
  const userName = { username: localStorage.getItem("username") };
  console.log("these are the routine details", routineDetails);

  // Set to local states
  const [newRoutineName, setNewRoutineName] = useState(
    routineDetails.routineName
  );
  const [templateName, setTemplateName] = useState(routineDetails.templateName);
  const [allExercises, setAllExercisesFromDB] = useState([]);

  const [savedExercises, setSavedExercises] = useState([]);
  // For modal
  const [showModalExerciseSet, setShowModalExerciseSet] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState({});
  const [modifiedExercise, setModifiedExercise] = useState({});

  // HandleClose
  const handleCloseSearch = () => {
    setShowModalSearch(false);
  };

  // Logic for buttons (Have to filter between ARRAY (saved exercises) and OBJECT (search results))
  const handleAddExercise = (exercise) => {
    console.log("triggered add exercise function");
    console.log(exercise);

    // Push to redux store then navigate to manage exercise
    // Push the exercise name to the redux store

    setSavedExercises((prevExercises) => [...prevExercises, exercise]);
    console.log("line 65" + savedExercises);
    console.log("Added exercise:", exercise);
  };

  const handleRemoveExercise = (exercise) => {
    console.log("line70" + exercise.name);

    // NEED TO EDIT THIS
    setSavedExercises((prevExercises) =>
      prevExercises.filter(
        (prevExercise) => prevExercise.exerciseName !== exercise.exerciseName
      )
    );
    // Expanded is false
    setExpanded(false);
    console.log("Exercise removed:", exercise);
  };

  const handleEditExercise = (exercise) => {
    // Perform the necessary logic to edit the exercise
    // For example, you can navigate to an edit page or open a modal

    console.log("Exercise edited:", exercise);

    // Set the selected exercise to pass to modal

    setSelectedExercise(exercise);

    // Click to open the modal
    setShowModalExerciseSet(true);

    // Redirect to the edit page
    // navigate('/manageExercise')
  };

  // Passed into the modalExerciseSet component
  const modifyExerciseSets = (exercise, set, reps) => {
    set = parseInt(set);
    reps = parseInt(reps);

    if (
      Number.isInteger(set) &&
      set > 0 &&
      Number.isInteger(reps) &&
      reps > 0
    ) {
      const modifiedExercise = {
        ...exercise,
        targetReps: Array.from({ length: set }, () => reps),
      };

      // Find the index of the exercise in savedExercises
      const index = savedExercises.findIndex(
        (x) => x.exerciseName === exercise.exerciseName
      );

      // Create a new array with the modified exercise
      const updatedExercises = [...savedExercises];
      updatedExercises[index] = modifiedExercise;

      // Update the local state with the updated exercises
      setSavedExercises(updatedExercises);
      // Close modal
      setShowModalExerciseSet(false);

      console.log(
        "Exercise edited to include new sets and reps:",
        updatedExercises[index]
      );
      console.log(savedExercises);
    } else {
      console.error(
        "Invalid values for 'set' or 'reps'. Please provide positive integers."
      );
    }
  };

  // Close exerciseset modal
  const handleCloseModalExerciseSet = () => {
    setShowModalExerciseSet(false);
  };

  const saveRoutineToDB = () => {
    console.log("line 130" + savedExercises);
    console.log("this is username", userName);
    console.log("this is the routine name", newRoutineName);
    var createdBy = userName.username;

    // === DESIRED FORMAT ===
    // {
    //   "name": "Deadlifts",
    //   "targetReps": [8, 10, 12],
    //   "repBuffer": 2
    // },

    var exerciseInCorrectFormat = [];
    // === Convert savedExercises to the correct format ===
    for (var i = 0; i < savedExercises.length; i++) {
      var name = savedExercises[i].exerciseName;
      var targetReps = savedExercises[i].targetReps;

      // Need to account if there is a rep buffer, default on the backend this is being set to 2
      if (savedExercises[i].repBuffer) {
        var repBuffer = savedExercises[i].repBuffer;
        var exercise = {
          name: name,
          targetReps: targetReps,
          repBuffer: repBuffer,
        };
      } else {
        var exercise = {
          name: name,
          targetReps: targetReps,
        };
      }
      exerciseInCorrectFormat.push(exercise);
    }

    var postPayLoad = {
      name: newRoutineName,
      createdBy: {
        username: createdBy,
      },
      exercises: exerciseInCorrectFormat,
      // Right now put nothing for now
      tags: [],
      image: uploadedImageBase64,
    };

    console.log(postPayLoad);
    baseAxios
      .post("/routine/new", postPayLoad)
      .then((response) => {
        console.log(response.data.data.routineName);
        Swal.fire(
          "Good job!",
          `You have successfully created your new routine: <b>${newRoutineName}</b>`,
          "success"
        );
        navigate("/routine");
      })
      .catch((error) => alert(error));
  };

  // Expansion of individual cards
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  // State for uploaded image file
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageBase64, setUploadedImageBase64] = useState(null);

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Error reading the file"));
      };

      reader.readAsDataURL(file);
    });
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setUploadedImage(file);

    try {
      var base64Image = await readFileAsBase64(file);
      base64Image = base64Image.slice(base64Image.indexOf(",") + 1);
      setUploadedImageBase64(base64Image);
      console.log("Base64 image:", base64Image);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle remove image
  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  useEffect(() => {
    const setDefaultImage = async () => {
      try {
        const defaultImageData = await fetch(defaultImage);
        const defaultImageBlob = await defaultImageData.blob();
        var defaultBase64Image = await readFileAsBase64(defaultImageBlob);
        defaultBase64Image = defaultBase64Image.slice(
          defaultBase64Image.indexOf(",") + 1
        );
        setUploadedImageBase64(defaultBase64Image);
        console.log("Default image:", defaultBase64Image);
      } catch (error) {
        console.error("Error setting default image:", error);
      }
    };

    setDefaultImage();
  }, []);

  // Monitor changes in savedExercises and refresh when it changes
  useEffect(() => {
    console.log("Saved exercises changed:", savedExercises);
  }, [savedExercises]);

  // Exercise from database
  useEffect(() => {
    baseAxios
      .get("/exercise", { withCredentials: true })
      .then((response) => {
        console.log("In create routine use effect", response.data.data);
        setAllExercisesFromDB(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Exercises, sets and reps from Routine
  useEffect(() => {
    if (templateName === "" || templateName === "Select a base template") {
      return;
    }
    baseAxios
      .get(`/routine/find?username=LiftBro&name=${templateName}`)
      .then((response) => {
        console.log(templateName, "template name");
        console.log("In create routine use effect", response.data.exercises);
        setSavedExercises(response.data.exercises);
        setShowModalExerciseSet(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex flex-col">
            <div className="bg-custom-image rounded">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center uppercase text-white py-10 uppercase">
                Routine <span className="text-yellow-400">Creation</span>
              </h1>
              <p className="text-lg md:text-2xl text-white text-center font-bold">
                <span className=" block mb-2">
                  <span className="text-yellow-400 md:text-yellow-300">
                    Embrace your inner
                  </span>{" "}
                  <span className="font-bold uppercase">GigaChad</span>{" "}
                  <span className="font-bold text-yellow-400 md:text-yellow-300 ">
                    and meticulously design your personalized routine
                  </span>{" "}
                  <span className="underline uppercase">today</span>.
                </span>
              </p>

              <div className="flex items-center rounded justify-center">
                <div className="bg-black bg-opacity-40 p-6 md:px-20 rounded flex flex-col">
                  <button className="font-bold text-center text-xl md:text-2xl text-white mb-2">
                    Your Routine Name
                  </button>
                  <button className="rounded-full bg-yellow-300 text-black font-bold text-xl md:text-2xl mb-2">
                    {newRoutineName}
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-evenly p-6 md:p-10">
                {/* Add your content here */}
              </div>
            </div>
          </div>

          <div className="py-4">
            {/* Step 1: Image Upload Section */}
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-start px-4">
              <span className="bg-yellow-300 p-2 rounded uppercase font-bold">
                Step 1
              </span>{" "}
              Upload your desired image
            </h2>
            <div className="bg-white p-4 rounded shadow my-4 mx-auto w-full md:w-2/3">
              <input
                type="file"
                accept="image/*"
                className="border p-2"
                onChange={handleImageUpload}
              />
              {uploadedImage && (
                <div className="mt-4 flex flex-col justify-center items-center">
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Uploaded Routine"
                    className="w-40 h-40 p-1 object-cover rounded"
                  />
                  <button
                    className=" bg-red-500 hover:bg-red-600 text-white py-3 px-2 rounded"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <hr className="py-4"></hr>
            {/* Current exercises added into "cart" */}
            <div>
              <p className="font-bold  text-lg sm:text-xl text-start px-4">
                <span className="bg-yellow-300 p-2  rounded uppercase font-bold">
                  Step 2
                </span>{" "}
                Modify current template exercises
              </p>
              <div className="text-center">
                <div className="flex flex-col p-4">
                  {/* If there are no exercises, display a message */}
                  {savedExercises.length === 0 && (
                    <p className="text-center font-bold">
                      No exercises added yet. Click on the plus button to get
                      started!
                    </p>
                  )}
                  {savedExercises.map((exercise, index) => (
                    <CreateRoutineCard
                      exercise={exercise}
                      handleEditExercise={handleEditExercise}
                      handleRemoveExercise={handleRemoveExercise}
                    />
                  ))}
                </div>
                <div className="p-1">
                  <div className=" font-bold py-2 px-4 rounded-full">
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      className="w-7 h-7 cursor-pointer text-green-500 hover:text-green-600 "
                      onClick={() => setShowModalSearch(true)}
                    />
                  </div>
                </div>

                {savedExercises.length > 0 && (
                  <div className="p-4">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white rounded py-3 font-bold w-full"
                      onClick={() => saveRoutineToDB()}
                    >
                      Save Routine
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* =============================================== */}
          </div>
          {/* Set conditiononly if exercises not empty*/}

          <ModalExerciseSets
            isOpen={showModalExerciseSet}
            onClose={() => setShowModalExerciseSet(false)}
            // handleChanges={handleChanges}
            handleEditExercise={modifyExerciseSets}
            exercise={selectedExercise}
          />

          <ModalSearchResults
            isOpen={showModalSearch}
            onClose={handleCloseSearch}
            savedExercises={savedExercises}
            exercisesData={allExercises}
            addExercises={handleAddExercise}
          />
        </div>
      )}
    </div>
  );
}

export default CreateRoutine;
