import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import CardHistory from '../component/CardHistory';
import Searchbar from '../component/Searchbar';


function History() {
    const navigate = useNavigate();
    const [routineDescription, setRoutineDescription] = useState('');

    // Use Selector to get the routine details from the redux store (Dispatched from Modal)
    const historyDetails = useSelector((state) => state.history.historyDetails);

    // Set to local states
    //const [newRoutineName, setNewRoutineName] = useState(historyDetails.historyName);
    //const [selectedTemplateExercises, setScteeledTemplateExercises] = useState(historyDetails.exercises);

    //console.log(selectedTemplateExercises)

    const results = [
        { name: 'Exercise 1', description: 'Exercise 1 description' },
        { name: 'Exercise 2', description: 'Exercise 2 description' },
        { name: 'Exercise 3', description: 'Exercise 3 description' },
        { name: 'Exercise 4', description: 'Exercise 4 description' },
        { name: 'Exercise 5', description: 'Exercise 5 description' },
        { name: 'Exercise 6', description: 'Exercise 6 description' },
        { name: 'Exercise 7', description: 'Exercise 7 description' },
        { name: 'Exercise 8', description: 'Exercise 8 description' },
        { name: 'Exercise 9', description: 'Exercise 9 description' },
        { name: 'Exercise 10', description: 'Exercise 10 description' },
        { name: 'Exercise 11', description: 'Exercise 11 description' },
        { name: 'Exercise 12', description: 'Exercise 12 description' },
        { name: 'Exercise 13', description: 'Exercise 13 description' },
        { name: 'Exercise 14', description: 'Exercise 14 description' },
        { name: 'Exercise 15', description: 'Exercise 15 description' }
      ];

      const [searchInput, setSearchInput] = useState('');
      const [searchResults, setSearchResults] = useState(results);
      //const [savedExercises, setSavedExercises] = useState(historyDetails.exercises)
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


    return(
        <div>
            <h1 className="text-2xl font-bold">History</h1>

            {/* Searchbar component */}
            <h2 className="text-lg font-bold mb-2">Search for Exercise</h2>

            <Searchbar exerciseData={results} handleSearch={handleSearch}/>

            <div class="grid md:grid-cols-2 gap-10 lg:grid-cols-4 gap-10 place-items-center py-10">
            {/* CardHistory Components Hardcoded */}
            <CardHistory />

            <CardHistory />

            <CardHistory />

            <CardHistory />

            <CardHistory />

            <CardHistory />

            <CardHistory />

            <CardHistory />


            </div>
        </div>

        
    )
}

export default History