import React, { useState } from 'react'
//import { useNavigate } from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux'
import CardHistory from '../component/CardHistory';
import SearchbarHistory from '../component/SearchbarHistory';
import Searchbar from '../component/Searchbar';

const History = () => {
  const[histories, setHistories] = useState([
    {date: "15/6/2023", routinename: "RoutineName1", exercises: ["Name1", "Name2", "Name3"], duration: "2 Hours", calories: "240KJ"},
    {date: "28/12/1997", routinename: "RoutineName2", exercises: ["Name1", "Name2", "Name3"], duration: "2 Hours", calories: "240KJ"},
    {date: "12/5/2020", routinename: "RoutineName3", exercises: ["Name1", "Name2", "Name3"], duration: "2 Hours", calories: "240KJ"},
    {date: "30/5/2004", routinename: "RoutineName4", exercises: ["Name1", "Name2", "Name3"], duration: "2 Hours", calories: "240KJ"},
    {date: "5/7/2008", routinename: "RoutineName5", exercises: ["Name1", "Name2", "Name3"], duration: "2 Hours", calories: "240KJ"},
    {date: "6/8/2018", routinename: "RoutineName6", exercises: ["Name1", "Name2", "Name3"], duration: "2 Hours", calories: "240KJ"},
    {date: "8/3/2015", routinename: "RoutineName7", exercises: ["Name1", "Name2", "Name3"], duration: "2 Hours", calories: "240KJ"},
    {date: "8/3/2015", routinename: "RoutineName8", exercises: ["Name1", "Name2", "Name3"], duration: "2 Hours", calories: "240KJ"},
  ]);



  const [searchResults, setSearchResults] = useState([])


  const handleSearch = (data, filterString) => {

    // Handlesearch will be used in the search bar component (Parent to child)
    console.log(filterString)
    console.log(data)

    if (filterString != "") {
      const searchOutput = data.filter((result) => {
        return result.routinename.toLowerCase().includes(filterString.toLowerCase())
      });
  
      setSearchResults(searchOutput);

    } else {
      console.log("in the handlesearch component" + data)
      setSearchResults(data);
    }
  };





  // const [searchInput, setSearchInput] = useState('');
  // const [searchResults, setSearchResults] = useState(histories);

  // const handleSearch = (data, filterString) => {

  //   // Handlesearch will be used in the search bar component (Parent to child)

  //   if (filterString !== "") {
  //     const searchOutput = data.filter((result) => {
  //       return result.routinename.toLowerCase().includes(filterString.toLowerCase()) ||
  //         result.description.toLowerCase().includes(filterString.toLowerCase());
  //     });
  
  //     setSearchResults(searchOutput);

  //   } else {
  //     console.log("in the handlesearch component" + data)
  //     setSearchResults(data);
  //   }
  // };

  return(
      <div>
          <h1 className="text-3xl font-bold py-4">History</h1>
          {/* <SearchbarHistory data={histories} handleSearch={handleSearch} /> */}

          {/* Searchbar component */}
          {/* <h2 className="text-lg font-bold mb-2 py-6">Search for Routines</h2> */}
          <Searchbar exerciseData={histories} handleSearch={handleSearch}/>

          {/* History card component */}
          <div>
          <CardHistory histories = {searchResults}/>

          {/* {if searchResult == 0 return (
            <h2>Sorry no results found</h2>
              CardHistory histories = {history}/>

          )} */}


          </div>
      </div>
    )
}

export default History