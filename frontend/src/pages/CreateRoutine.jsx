import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Searchbar from '../component/Searchbar';
import ModalExerciseSets from '../component/ModalExerciseSets';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import CreateRoutineCard from '../component/CreateRoutineCard';
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
  console.log("these are the routine details", routineDetails)

  // Set to local states
  const [newRoutineName, setNewRoutineName] = useState(routineDetails.routineName);
  const [templateName, setTemplateName] = useState(routineDetails.templateName);
  const [allExercises, setAllExercisesFromDB] = useState([]);



  const [savedExercises, setSavedExercises] = useState([])
  // For modal
  const [showModalExerciseSet, setShowModalExerciseSet] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState({});
  const [modifiedExercise, setModifiedExercise] = useState({});


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
    setShowModalExerciseSet(true);



    // Redirect to the edit page
    // navigate('/manageExercise')
  };

  // Passed into the modalExerciseSet component
  const modifyExerciseSets = (exercise, set, reps) => {
    set = parseInt(set);
    reps = parseInt(reps);
  
    if (Number.isInteger(set) && set > 0 && Number.isInteger(reps) && reps > 0) {
      const modifiedExercise = {
        ...exercise,
        targetReps: Array.from({ length: set }, () => reps),
      };
  
      // Find the index of the exercise in savedExercises
      const index = savedExercises.findIndex((x) => x.exerciseName === exercise.exerciseName);
  
      // Create a new array with the modified exercise
      const updatedExercises = [...savedExercises];
      updatedExercises[index] = modifiedExercise;
  
      // Update the local state with the updated exercises
      setSavedExercises(updatedExercises);
      // Close modal
      setShowModalExerciseSet(false);
  
      console.log("Exercise edited to include new sets and reps:", updatedExercises[index]);
    } else {
      console.error("Invalid values for 'set' or 'reps'. Please provide positive integers.");
    }
  };



  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
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

  // Exercises, sets and reps from Routine 
  useEffect(() => {
    
    axios.get(`http://localhost:8080/routine/find?username=LiftBro&name=${templateName}`, { withCredentials: true })
      .then((response) => {
        console.log(templateName, "template name")
        console.log("In create routine use effect", response.data.exercises)
        alert("i am triggered")
        setSavedExercises(response.data.exercises)
        setShowModalExerciseSet(false)
      }
      )
      .catch((error) => console.log(error));


  },[])



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
                <CreateRoutineCard exercise={exercise} handleEditExercise={handleEditExercise} handleRemoveExercise={handleRemoveExercise}/>
              
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
        onClose={() => setShowModalSearch(false)}
        savedExercises={savedExercises}
        exercisesData={allExercises}
        addExercises={handleAddExercise}

      />
    </div>
  );



}

export default CreateRoutine