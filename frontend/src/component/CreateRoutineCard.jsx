import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Searchbar from '../component/Searchbar';
import ModalExerciseSets from '../component/ModalExerciseSets';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
const CreateRoutineCard = ({ exercise, handleEditExercise, handleRemoveExercise }) => {
    const [expanded, setExpanded] = useState(false);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        setContentHeight(expanded ? `${contentRef.current.scrollHeight}px` : '0px');
    }, [expanded]);

    // Use Effect if screen size changes, then expanded is false

    const handleRemoveExercise2 = (exercise) => {
        handleRemoveExercise(exercise);
        setExpanded(false);
    }
    
    useEffect(() => {
        const handleResize = () => {
        if (expanded) {
            setExpanded(false);
        }
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, [expanded, handleRemoveExercise2]);



    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };
    return (
        <div className="bg-gray-300 rounded p-4 m-1 flex flex-col" >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className={`text-lg font-bold ${expanded ? 'mb-2' : ''}`}>{exercise.exerciseName}</h3>
                </div>


                <div>
                    <button onClick={handleToggleExpand}>
                        <FontAwesomeIcon icon={expanded ? faCaretUp : faCaretDown} />
                    </button>
                </div>
            </div>

            <div className={`overflow-hidden transition-height duration-300`} style={{ height: contentHeight }}
                ref={contentRef}>
              <img
  className="object-cover w-full h-48 mt-2 rounded-md bg-top md:hidden"
  src={require('../assets/gigachad.png')}
  alt="Example Image"
/>
               

                <div className="mt-4">
                    <div className="flex items-center mb-2 font-bold">
                        <div className="bg-blue-600 text-white p-2 rounded flex items-center s">
                            Sets <span className="bg-white p-1 rounded text-blue-600 text-xs sm:text-sm ml-2">{exercise.targetReps.length}</span>
                        </div>
                        <div className="bg-blue-600 text-white p-2 rounded flex items-center ml-2">
                            {/* Assume that for each set, each Rep IS the SAME for now  === CFM w baoshin and team on this */}
                            Reps <span className="bg-white p-1 rounded text-blue-600 text-xs sm:text-sm ml-2">{exercise.targetReps[0]}</span>
                        </div>
                    </div>
                    <div className="flex sm:justify-end justify-start">
                        <button
                            onClick={() => handleEditExercise(exercise)}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full"
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                            onClick={() => handleRemoveExercise2(exercise)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full ml-2"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateRoutineCard