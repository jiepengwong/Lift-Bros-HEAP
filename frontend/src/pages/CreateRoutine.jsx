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



  const [savedExercises, setSavedExercises] = useState(routineDetails.exercises)
  // For modal
  const [showModal, setShowModal] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState({});



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
      prevExercises.filter((prevExercise) => prevExercise.name !== exercise.name)
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
            Modifying Your Routine
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
              {/* If there are no exercises, display a message */}
              {savedExercises.length === 0 && (
                <p className="text-center font-bold">No exercises added yet. Click on the plus button to get started!</p>
              )}
              {savedExercises.map((exercise, index) => (
                <div key={index} className="bg-gray-300 rounded p-2 m-1 flex items-center justify-center">
                  <div className="flex-1 ">
                    <p className="font-bold">{exercise.name}</p>
                  </div>

                  <div className="flex-3 flex items-center justify-end space-x-2">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full">
                      Edit
                    </button>
                    <button onClick={() => {handleRemoveExercise(exercise)}}className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
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

            {savedExercises.length > 0 && (
              <div className="p-4">
                <button className="bg-green-500 hover:bg-green-600 text-white rounded py-3 font-bold w-full">
                Save Routine</button>

              </div>)}

          </div>
        </div>
        {/* =============================================== */}




      </div>
      {/* <ModalExerciseSets
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        handleChanges={handleChanges}
        exercise={selectedExercise}
      /> */}

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