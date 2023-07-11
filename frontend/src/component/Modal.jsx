import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { setRoutineDetails } from '../redux/slice/createRoutineSlice';
import axios from "axios";

const Modal = ({ isOpen, onClose, templateExercises}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [routineName, setRoutineName] = useState( '');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([])

  

  const handleRoutineNameChange = (event) => {
    setRoutineName(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption( event.target.value);
    console.log("handleOptionChange", event.target.value)
    setSelectedExercises(templateExercises.find(option => option.name === event.target.value).exercises)
    console.log("selected exercises for:" , event.target.value, templateExercises.find(option => option.name === event.target.value).exercises)
  };

  if (!isOpen) return null;

  const handleSave = () => {
    console.log(routineName, selectedOption)
    onClose();
    // Clear the routine name
    setRoutineName('');
    setSelectedOption('');

    // Store the routine name and selected option in the redux store
    dispatch(setRoutineDetails({ "routineName" :routineName, exercises: selectedExercises }));
    

    // Redirect to create routine page
    navigate('/createRoutine')
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-75" onClick={onClose} />
      {console.log(templateExercises)}

      <div className="bg-white p-8 rounded shadow-lg z-10">
        <h2 className="text-2xl font-bold mb-4">Create New Routine</h2>

        <input
          className="w-full h-12 border border-gray-300 rounded px-4 mb-4"
          type="text"
          placeholder="Routine Name"
          value={routineName}
          onChange={handleRoutineNameChange}
        />

        <select
          className="w-full h-12 border border-gray-300 rounded px-4 mb-4"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="">Select an option</option>
          {templateExercises.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
              {console.log(option)}
            </option>
          ))}
        </select>

        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
            onClick={handleSave}
          >
            Save Routine
          </button>
          <button
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded px-4 py-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
