import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Searchbar from '../component/Searchbar';
import ModalExerciseSets from '../component/ModalExerciseSets';

function CreateRoutine() {
  const navigate = useNavigate();
  const [routineDescription, setRoutineDescription] = useState('');

  // Use Selector to get the routine details from the redux store (Dispatched from Modal)
  const routineDetails = useSelector((state) => state.routine.routineDetails);

  // Set to local states
  const [newRoutineName, setNewRoutineName] = useState(routineDetails.routineName);
  const [selectedTemplateExercises, setScteeledTemplateExercises] = useState(routineDetails.exercises);


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
  const [selectedExercise, setSelectedExercise] = useState({});




  const handleSearch = (data, filterString) => {
    // Handlesearch will be used in the search bar component (Parent to child)
    if (filterString != "") {
      const searchOutput = data.filter((result) => {
        return result.name.toLowerCase().includes(filterString.toLowerCase()) ||
          result.description.toLowerCase().includes(filterString.toLowerCase());
      });
  
      setSearchResults(searchOutput);

    } else {
      console.log("in the handlesearch component" + data)
      setSearchResults(data);
    }
  };

  // Logic for buttons (Have to filter between ARRAY (saved exercises) and OBJECT (search results))
  const handleAddExercise = (exercise) => {
    console.log(exercise)

    // Push to redux store then navigate to manage exercise
    // Push the exercise name to the redux store

    var tempResult = {"exercise": exercise.name, "sets": exercise.sets, "reps": exercise.reps}
    setSavedExercises((prevExercises) => [...prevExercises, tempResult]);
    console.log('Added exercise:', exercise.name);
  };

  const handleRemoveExercise = (exercise) => {
    console.log("line70" + exercise.name)

    // NEED TO EDIT THIS 
    setSavedExercises((prevExercises) =>
      prevExercises.filter((prevExercise) => prevExercise !== exercise.name)
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

  const handleChanges = (sets,reps, exerciseName) => {
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
      
}



  // Monitor changes in savedExercises and refresh when it changes
  useEffect(() => {
    console.log('Saved exercises changed:', savedExercises);
  }, [savedExercises]);



  return (
    <div>
      <div className="grid grid-cols-4 gap-4 p-3">
        <div className="col-span-3 bg-gray-200 rounded">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center m-10 p-2">
            Create and Search for Routines
          </h1>
        </div>
        <div className="col-span-1 flex flex-col justify-center bg-gray-200 p-4">
          <p className="font-bold text-center mb-2">Routine Name:</p>
          <p className="text-center">{newRoutineName}</p>
          <p className="font-bold text-center mt-4 mb-2">Current Exercises:</p>
          <ul className="text-center">
            {savedExercises.map((exercise, index) => (
              <li key={index} className="capitalize">{exercise.exercise}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="py-4">


        {/* Searchbar component */}
        <div className="py-4">
          <h2 className="text-lg font-bold mb-2">Search for Routines</h2>

          <Searchbar exerciseData={results} handleSearch={handleSearch}/>

         

          {/* Saved exercises, from the preloaded exercises + Any other exercises that comes */}
          {/* If selectedTemplateExercises not empty and it exists, filter through the list and add it as saved */}
          {savedExercises.length > 0 ? (
            <div className="py-4">
              <h2 className="text-lg font-bold mb-2">Exercises in: Routine {newRoutineName}</h2>
              <div className="grid grid-cols-2 gap-4">
                {savedExercises.map((exerciseName, index) => {
                  const result = results.find((result) => result.name === exerciseName.exercise);

                  if (result) {
                    return (
                      <div className="bg-gray-200 rounded p-4" key={index}>
                        <h3 className="text-lg font-bold">{result.name}</h3>
                        <p className="text-sm">{result.description}</p>
                        <div>
                          <span className="font-bold">Sets:</span> {result.sets}
                        </div>
                        <div>
                          <span className="font-bold">Reps:</span> {result.reps}
                        </div>
                        <div className="flex justify-between mt-2">
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
                            onClick={() => handleRemoveExercise(result)}
                          >
                            Remove Exercise
                          </button>

                          <button
                            className="bg-orange-500 hover:bg-orange-600 text-white rounded px-4 py-2 ml-2"
                            onClick={() => handleEditExercise(result)}
                          >
                            Edit Exercise
                          </button>
                        </div>
                      </div>
                    );
                  } else {
                    return null; // Exercise not found in results
                  }
                })}
              </div>
            </div>
          ) : (
            <p>No exercises found.</p>
          )}

          {/* Search results */}
          <div>
            <h2 className="text-lg font-bold mb-2">Search Results</h2>
            <div className="grid grid-cols-2 gap-4">
              {searchResults.map((result, index) => {
                // savedExercises is an array, check it it matches the name of the result
                const isExerciseAdded = savedExercises.some(
                  (exercise) => exercise.exercise === result.name
                );

                return (
                  <div className="bg-gray-200 rounded p-4" key={index}>
                    <h3 className="text-lg font-bold">{result.name}</h3>
                    <p className="text-sm">{result.description}</p>
                    <button
                      className={`bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mt-2 ${isExerciseAdded ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      onClick={() => handleAddExercise(result)}
                      disabled={isExerciseAdded}
                    >
                      {isExerciseAdded ? 'Exercise Added' : 'Add Exercise'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ModalExerciseSets 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        handleChanges={handleChanges}
        exercise={selectedExercise}
      />
    </div>
  );



}

export default CreateRoutine