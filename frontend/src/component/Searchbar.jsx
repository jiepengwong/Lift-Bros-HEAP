import React from 'react'
import { useState } from 'react'

// Exercise data - from db, handlesearch from parent
function Searchbar({ exerciseData,  handleSearch }) {
    console.log(exerciseData)
    const [searchInput, setSearchInput] = useState('');
    console.log(searchInput)

        return (
            <div className="flex items-center justify-center">
                <div className="flex items-center border-b-2 border-teal-500 py-2 px-4 w-1/2">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Search Routines"
                        aria-label="Full name"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                        onClick={() => handleSearch(exerciseData, searchInput)}
                        >
                        Search
                    </button>
                </div>
            </div>)
    }

    export default Searchbar