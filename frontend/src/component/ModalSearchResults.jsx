import React from 'react';
import { useEffect, useState } from 'react';
import Searchbar from '../component/Searchbar';
import axios from 'axios';

// Modal search results
// 1. Take in saved exercises
// 2. Search to filter accordingly to the saved exercises, do not show the saved exercises


function ModalSearchResults({ isOpen, onClose, savedExercises, exercisesData, addExercises }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  console.log(exercisesData, " i am in ModalSearchResults")

  useEffect(() => {
    const savedExerciseNames = savedExercises.map(exercise => exercise.exerciseName);
    console.log(savedExerciseNames, " i am in this useEffect")
    const filteredExercises = exercisesData.filter(exercise => !savedExerciseNames.includes(exercise.name));
    setSearchResults(filteredExercises);
    console.log("this is the filtered data", filteredExercises)
  }, [savedExercises]);

 const handleSearch = (data, filterString, savedExercises) => {
  // Filter out the saved exercises first
  const savedExerciseNames = savedExercises.map(exercise => exercise.exerciseName);
  const filteredData = data.filter(exercise => !savedExerciseNames.includes(exercise.name));

  if (filterString !== '') {
    setSearchInput(filterString);
    const searchOutput = filteredData.filter(result => {
      return (
        (result.exerciseName && result.exerciseName.toLowerCase().includes(filterString.toLowerCase())) ||
        (result.description && result.description.toLowerCase().includes(filterString.toLowerCase()))
      );
    });

    setSearchResults(searchOutput);
  } else {
    setSearchInput('');
    setSearchResults(filteredData); // Show filtered exercises if filterString is empty
  }
};

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddExercise = exercise => {
    // Create a copy of the exercise object
    const exerciseClone = {
      ...exercise,
      targetReps: exercise.defaultReps,
      exerciseName: exercise.name,
    };
  
    // Remove unnecessary properties
    delete exerciseClone.defaultReps;
    delete exerciseClone.name;
  
    console.log("triggered add exercise function in ModalSearchResults");
    console.log(exerciseClone);
  
    // Update the saved exercises state using the addExercises function
    addExercises(exerciseClone);
  
    // Update the search results state to filter out the added exercise
    setSearchResults(prevResults => prevResults.filter(result => result.name !== exerciseClone.exerciseName));
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gray-800 opacity-75 fixed inset-0" onClick={onClose}></div>

        <div className="w-4/5 h-4/5 max-w-3xl mx-auto bg-white rounded-lg p-1 shadow-lg overflow-y-auto z-10">
          <div className="max-h-full overflow-y-auto modal-content">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">Search for Exercises</h2>

              <div>
                <Searchbar exerciseData={exercisesData} handleSearch={handleSearch} savedExercises={savedExercises} />
                {console.log("search results", searchResults)}
              </div>

              <div>
                <div className="p-5">
                <h2 className="text-lg font-bold mb-2  text-start">Search Results: {searchResults.length}</h2>
                  {searchInput !== '' && (
                    <h2 className="text-lg font-bold mb-2 text-start text-blue-600">Search Input: {searchInput}</h2>
                  )}
                  {searchResults.length === 0 && searchInput !== '' && (
                    <h2 className="text-md font-bold mb-2 text-start font-italicized text-red-600">No results found, Try to search or select one of the other exercises below!</h2>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.length > 0 ? (
  searchResults.map(exercise => {
    // console.log(savedExercises, " i am in the map tooasdasdsdddddassd please")
    // Check if the exercise is already saved
    const isExerciseSaved = savedExercises.some(savedExercise => savedExercise.exerciseName === exercise.name);
    // console.log(isExerciseSaved, " i am in the map")
    // If the exercise is saved, don't render it
    if (!isExerciseSaved) {
      return (
        <div key={exercise.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{exercise.name}</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>{exercise.description}</p>
            </div>
            <div className="mt-5">
              <button onClick={() => handleAddExercise(exercise)}>Add</button>
            </div>
          </div>
        </div>
      );
    }
  })
) : (
  <div className="text-center">
    <p>No results found.</p>
  </div>
)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalSearchResults;