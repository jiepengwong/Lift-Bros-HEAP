import React from 'react';
import { useEffect, useState } from 'react';
import Searchbar from '../component/Searchbar';
import axios from 'axios';

// Modal search results
// 1. Take in saved exercises
// 2. Search to filter accordingly to the saved exercises, do not show the saved exercises


function ModalSearchResults({ isOpen, onClose, savedExercises, exercisesData, addExercises, removeExercisesOnClose }) {

  console.log(exercisesData, "this is the exercises data")
  console.log(savedExercises, "this is the exercises data")

  // Exclude savedExercises from exercisesData
  const savedExerciseNames = savedExercises.map(exercise => exercise.name);
  const filteredExercises = exercisesData.filter(exercise => !savedExerciseNames.includes(exercise.name));
  console.log(filteredExercises, "this is the filtered exercises")

  const [exercises, setExercises] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const [searchInput, setSearchInput] = useState('');


  // Handle search function 
  const handleSearch = (data, filterString) => {
    // Handlesearch will be used in the search bar component (Parent to child)
    if (filterString != "") {
      setSearchInput(filterString);
      console.log("filter string", filterString)
      const searchOutput = data.filter((result) => {
        return result.name.toLowerCase().includes(filterString.toLowerCase()) ||
          result.description.toLowerCase().includes(filterString.toLowerCase());
      });
      console.log(data)

      console.log(searchOutput, "this is the search output")

      setSearchResults(searchOutput);

    } else {
      console.log("in the handlesearch component" + filteredExercises)
      setSearchResults(filteredExercises);
    }
  };






  useEffect(() => {
    // Lock scroll when the modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll when the modal is closed
      document.body.style.overflow = 'auto';
    }

    return () => {
      // Restore scroll when the component is unmounted
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);


  // Reset search results to all exercises when modal is closed
  useEffect(() => {
    return () => {
      setSearchResults(filteredExercises);
      setSearchInput('');
    };
  }, [onClose, exercisesData]);

  if (!isOpen) return null;





  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gray-800 opacity-75 fixed inset-0" onClick={onClose}></div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg z-10">
          <div className="p-4 overflow-y-auto max-h-screen">
            <div className="py-4">
              <h2 className="text-lg font-bold mb-2">Search for Exercises</h2>

              <div>
                <Searchbar exerciseData={filteredExercises} handleSearch={handleSearch} />
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
                    searchResults.map((exercise) => (
                      <div key={exercise.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-4">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">{exercise.name}</h3>
                          <div className="mt-2 max-w-xl text-sm text-gray-500">
                            <p>{exercise.description}</p>
                          </div>
                          <div className="mt-5">
                            <button onClick={addExercises} >Add</button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    
                  
                    filteredExercises.map((exercise) => (
                      <div key={exercise.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">{exercise.name}</h3>
                          <div className="mt-2 max-w-xl text-sm text-gray-500">
                            <p>{exercise.description}</p>
                          </div>
                          <div className="mt-5">
                            <button onClick={() => addExercises(exercise)}>Add</button>
                          </div>
                        </div>
                      </div>
                    ))
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
