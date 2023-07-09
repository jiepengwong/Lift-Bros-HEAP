import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Searchbar from '../component/Searchbar';
import ModalExerciseSets from '../component/ModalExerciseSets';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlay,
  faPlusCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import ModalSearchResults from '../component/ModalSearchResults';
function CreateRoutine() {
  const navigate = useNavigate();
  const [routineDescription, setRoutineDescription] = useState('');

  // Use Selector to get the routine details from the redux store (Dispatched from Modal)
  const routineDetails = useSelector((state) => state.routine.routineDetails);

  // Set to local states
  const [newRoutineName, setNewRoutineName] = useState(routineDetails.routineName);
  const [selecctedExercises, setSelectedExercises] = useState(routineDetails.exercises);
  const [allExercises, setAllExercisesFromDB] = useState([]);

  const [results, setResults] = useState([
    { name: 'Exercise 1', description: 'Exercise 1 description', sets: 3, reps: 10 },
    { name: 'Exercise 2', description: 'Exercise 2 description', sets: 3, reps: 10 },
    { name: 'Exercise 3', description: 'Exercise 3 description', sets: 3, reps: 10 },
    { name: 'Exercise 4', description: 'Exercise 4 description', sets: 3, reps: 10 },
    { name: 'Exercise 5', description: 'Exercise 5 description', sets: 3, reps: 10 },
    { name: 'Exercise 6', description: 'Exercise 6 description', sets: 3, reps: 10 },
    { name: 'Exercise 7', description: 'Exercise 7 description', sets: 3, reps: 10 },
    { name: 'Exercise 8', description: 'Exercise 8 description', sets: 3, reps: 10 },
    { name: 'Exercise 9', description: 'Exercise 9 description', sets: 3, reps: 10 },
    { name: 'Exercise 10', description: 'Exercise 10 description', sets: 3, reps: 10 },
    { name: 'Exercise 11', description: 'Exercise 11 description', sets: 3, reps: 10 },
    { name: 'Exercise 12', description: 'Exercise 12 description', sets: 3, reps: 10 },
    { name: 'Exercise 13', description: 'Exercise 13 description', sets: 3, reps: 10 },
    { name: 'Exercise 14', description: 'Exercise 14 description', sets: 3, reps: 10 },
    { name: 'Exercise 15', description: 'Exercise 15 description', sets: 3, reps: 10 }


  ])


  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState(results);
  const [savedExercises, setSavedExercises] = useState(routineDetails.exercises)
  // For modal
  const [showModal, setShowModal] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState({});



  // Clear data on close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExercise({});
  };

  // Logic for buttons (Have to filter between ARRAY (saved exercises) and OBJECT (search results))
  const handleAddExercise = (exercise) => {
    console.log("triggered add exercise function")
    console.log(exercise)

    // Push to redux store then navigate to manage exercise
    // Push the exercise name to the redux store

    setSavedExercises((prevExercises) => [...prevExercises, exercise]);
    console.log("line 65" + savedExercises)
    console.log('Added exercise:', exercise.name);
  };

  const handleRemoveExercise = (exercise) => {
    console.log("line70" + exercise.name)

    // NEED TO EDIT THIS 
    setSavedExercises((prevExercises) =>
      prevExercises.filter((prevExercise) => prevExercise.exercise !== exercise.name)
    );
    console.log('Exercise removed:', exercise);
  };

  const handleEditExercise = (exercise) => {
    // Perform the necessary logic to edit the exercise
    // For example, you can navigate to an edit page or open a modal

    console.log('Exercise edited:', exercise);

    // Set the selected exercise to pass to modal
    setSelectedExercise(exercise);

    // Click to open the modal
    setShowModal(true);



    // Redirect to the edit page
    // navigate('/manageExercise')
  };

  const handleChanges = (sets, reps, exerciseName) => {
    // Filter through the results and find the exercise that matches the exercise name, and then replace the sets and reps
    const newResults = results.map((result) => {
      if (result.name === exerciseName) {
        return {
          ...result,
          sets,
          reps,
        };
      }
      return result;
    });

    // Update the results state with the modified array
    setResults(newResults);
    // Update the modal to false, to close it
    setShowModal(false);

  }
  



  // Monitor changes in savedExercises and refresh when it changes
  useEffect(() => {
    console.log('Saved exercises changed:', savedExercises);
  }, [savedExercises]);

  // Exercise from database
  useEffect(() => {
    axios.get('http://localhost:8080/exercise', { withCredentials: true })
      .then((response) => {
        console.log("In create routine use effect", response.data.data)
        setAllExercisesFromDB(response.data.data)
      })
      .catch((error) => console.log(error));
  }, []);



  return (
    <div>
      <div className="flex flex-col">
        <div className=" bg-gray-200 rounded">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center m-10 p-10">
            Create and Search for Exercises
          </h1>
        </div>

        <div className="flex flex-row justify-evenly bg-gray-200 p-10">
          <div>
            <p className="font-bold text-center  text-lg mb-2">Current Selected Routine Name:</p>
            <p className="text-center">{newRoutineName}</p>

          </div>
        </div>
      </div>

      <div className="py-4">
        {/* Current exercises added into "cart" */}
        <div>
          <p className="font-bold  text-lg text-start px-4">Current Exercises:</p>
          <div className="text-center">

            <div className="flex flex-col p-4">
              {savedExercises.map((exercise, index) => (
                <div key={index} className="bg-gray-300 rounded p-2 m-1 flex items-center justify-center">
                  <div className="flex-1 ">
                    <p className="font-bold">{exercise.name}</p>
                  </div>

                  <div className="flex-3 flex items-center justify-end space-x-2">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                      Remove
                    </button>
                  </div>
                </div>
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
          </div>
        </div>
        {/* =============================================== */}




      </div>
      <ModalExerciseSets
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        handleChanges={handleChanges}
        exercise={selectedExercise}
      />

      <ModalSearchResults
        isOpen={showModalSearch}
        onClose={() => setShowModalSearch(false)}
        savedExercises={savedExercises}
        exercisesData={allExercises}
        addExercises={handleAddExercise}

        />
    </div>
  );



}

export default CreateRoutine