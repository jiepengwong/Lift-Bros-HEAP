import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useNavigate } from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux'
import CardHistory from "../component/CardHistory";
import Searchbar from "../component/Searchbar";
import baseAxios from "../axios/baseAxios";

const History = () => {
  const [histories, setHistories] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/completedRoutine/user/LiftBro",
        { withCredentials: true }
      );
      console.log(response.data.data);
      setHistories(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  }, []);

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (data, filterString) => {
    // Handlesearch will be used in the search bar component (Parent to child)
    console.log(filterString);
    console.log(data);

    if (filterString != "") {
      const searchOutput = data.filter((result) => {
        return result.routineName
          .toLowerCase()
          .includes(filterString.toLowerCase());
      });

      setSearchResults(searchOutput);
    } else {
      console.log("in the handlesearch component" + data);
      setSearchResults(data);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold py-4">History</h1>
      {/* <SearchbarHistory data={histories} handleSearch={handleSearch} /> */}

      {/* Searchbar component */}
      <h2 className="text-lg font-bold mb-2 py-6">Search for Routines</h2>
      <Searchbar exerciseData={histories} handleSearch={handleSearch} />

      {/* History card component */}
      <div>
        <CardHistory histories={searchResults} />
        {/* <CardHistory histories = {searchResults}/> */}

        {/* {if searchResult == 0 return (
            <h2>Sorry no results found</h2>
              CardHistory histories = {history}/>

          )} */}
      </div>
    </div>
  );
};

export default History;
