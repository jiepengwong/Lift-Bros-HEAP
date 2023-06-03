import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';


function CreateRoutine() {
  const navigate = useNavigate();
  const [routineName, setRoutineName] = useState('');
  const [routineDescription, setRoutineDescription] = useState('');

  const handleSaveRoutine = () => {
    // Save the routine or perform necessary actions
    // You can replace the console.log statement with your desired logic
    console.log('Routine Saved:', routineName, routineDescription);

    // Navigate to the confirmation page or any other desired screen
    navigate('ConfirmationScreen');
  };

  return (
    <div className="bg-white">
        create and search for routines
    </div>
  );

}

export default CreateRoutine