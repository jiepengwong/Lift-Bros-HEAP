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

  useEffect(() => {
    const savedExerciseNames = savedExercises.map(exercise => exercise.name);
    const filteredExercises = exercisesData.filter(exercise => !savedExerciseNames.includes(exercise.name));
    setSearchResults(filteredExercises);
  }, [savedExercises, exercisesData]);

  const handleSearch = (data, filterString) => {
    if (filterString !== '') {
      setSearchInput(filterString);
      const searchOutput = data.filter(result => {
        return (
          result.name.toLowerCase().includes(filterString.toLowerCase()) ||
          result.description.toLowerCase().includes(filterString.toLowerCase())
        );
      });
      setSearchResults(searchOutput);
    } else {
      setSearchInput('');
      setSearchResults(exercisesData);
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
    addExercises(exercise);
    setSearchResults(prevResults => prevResults.filter(result => result.name !== exercise.name));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gray-800 opacity-75 fixed inset-0" onClick={onClose}></div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg z-10">
          <div className="p-4 overflow-y-auto max-h-screen">
            <div className="py-4">
              <h2 className="text-lg font-bold mb-2">Search for Exercises</h2>

              <div>
                <Searchbar exerciseData={exercisesData} handleSearch={handleSearch} />
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
                    searchResults.map(exercise => (
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
                    ))
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