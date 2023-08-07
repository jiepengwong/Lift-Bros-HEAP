// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlay,
//   faPlusCircle,
//   faBars,
// } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// // Import components
// import Modal from "../component/Modal";
// import baseAxios from "../axios/baseAxios";

// // Components
// import CardPlanner from "../component/CardPlanner";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Swaf from "sweetalert2"

// function Planner() {
//   const navigate = useNavigate();
//   const [usernameDetails, setUsernameDetails] = useState(
//     {
//       username: localStorage.getItem("username"),
//       token: localStorage.getItem("token"),
//     }
//   );

//   const [searchQueryMyRoutines, setSearchQueryMyRoutines] = useState("");
//   const [searchQueryOtherRoutines, setSearchQueryOtherRoutines] = useState("");
//   const [searchQueryPastRoutines, setSearchQueryPastRoutines] = useState("");


//   // Template buttons
//   const [plannerButtons, setPlannerButtons] = useState(["My Routines", "Other Routines", "Past Routines", "Add New Routine"]);
//  // Local state for past routines
//   const [pastRoutinesCards, setPastRoutinesCards] = useState([]);
//   // === Tabs ===
//   // Active tab state
//   const [activeTab, setActiveTab] = useState(0);
//   // Change tabs
//   const handleTabChange = (index) => {
//     setActiveTab(index);
//   };

//   //  === Modal local states ===
//   const [showModal, setShowModal] = useState(false);

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // Function to toggle mobile menu
//   const toggleMobileMenu = () => {
//     setMobileMenuOpen((prevState) => !prevState);
//   };

//   // === Local states for routine cards ===
//   const [routineCards, setRoutineCards] = useState([]);
//   const [otherUserRoutineCards, setOtherUserRoutineCards] = useState([]);

//   const handleDelete = (username,routineName ) => {
//     // Delete routine from database


//     baseAxios.delete(`/routine/?username=${username}&name=${routineName}`)
//       .then((response) => {
//         console.log(response);
//         // Delete routine from state
//         setRoutineCards((prevState) => {
//           return prevState.filter((routine) => {
//             return routine.name !== routineName;
//           });
//         });

//         // Show success message
//         Swaf.fire({
//           icon: "success",
//           title: "Deletion successful",
//           html: `Your routine <b>${routineName}</b> has been deleted`,
//           showConfirmButton: true,
//         });

//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     }


//   // Database data
//   useEffect(() => {
//     // Fetch data from database
//     if (activeTab == 0) {
//       console.log("active tab is 0")
//       // Fetch user tabs
//       console.log(usernameDetails.username);
//       axios
//         .get(`http://localhost:8080/routine/user/${usernameDetails.username}`, {
//           withCredentials: true,
//         })
//         .then((response) => {
//           console.log(" i am called")
//           // Get routines of user here 
//           console.log(usernameDetails.username)
//           console.log(response.data.data);
//           setRoutineCards(response.data.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }

//     if (activeTab == 1) {
//       // Fetch other user data

//       // Fetch OTHER user data
//       axios
//         .get(`http://localhost:8080/routine`, {
//           withCredentials: true,
//         })
//         .then((response) => {
//           // Get routines of user here 
//           // Get routines of user here 
//           console.log(response.data.data, "i am in tab 1");
//           // Filter out the routines that are not usernameDetails.username
//           // Filter out the routines that are not created by a specific user
//           console.log(usernameDetails.username, "username details")
//           const filteredRoutines = response.data.data.filter((routine) => {
//             return routine.createdBy != usernameDetails.username; // Replace 'yourUsername' with the desired username
//           });

//           console.log(filteredRoutines,"filtered routines")

//           setOtherUserRoutineCards(filteredRoutines);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }

//     if (activeTab === 2) {
//       // Fetch past routines data (replace with your logic)
//       axios
//         .get(`http://localhost:8080/completedRoutine/user/${localStorage.getItem("username")}`, {
//           withCredentials: true,
//         })
//         .then((response) => {
//           // Set past routines data here
//           console.log(response.data.data, "past routines data")
//           setPastRoutinesCards(response.data.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }, [activeTab]);

//   // Template data
//   const [templateExercises, setTemplateExercises] = useState([]);
//   // Database template data
//   useEffect(() => {
//     // Fetch data from the database
//     axios.get(`http://localhost:8080/routine/templates`,  {
//       withCredentials: true,
//     })
//       .then((response) => {
//         console.log("tempalte data" , response.data.data);
//         setTemplateExercises(response.data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//         // Handle the error here, such as displaying an error message or setting a default value for the state
//       });
//   }, []);

//   return (
//     <div>
//       <div>
//         {/* Planner page */}
//         <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center m-10 p-2">
//           Welcome to the Routines Page
//         </h1>

//         {/* Tab bar to filter between my Routines, favourites and other people routines */}
//         <div className="flex justify-center mb-11">
//           <nav className="hidden sm:flex flex-wrap justify-center sm:justify-start space-x-0 sm:space-x-10">
//             {/* Desktop navigation items */}
//             {/* Array map the buttons*/}
//             {plannerButtons.map((button, index) => {
//               if (button !== "Add New Routine") {
//                 return (
//                   <button
//                     key={index}
//                     className={`text-xl text-gray-500 hover:text-gray-800 focus:outline-none ${activeTab === index ? "border-b-2 border-blue-500" : ""
//                       }`}
//                     onClick={() => handleTabChange(index)}
//                   >
//                     {button}
//                   </button>
//                 );
//               } else {
//                 return (
//                   <div className="flex items-center mt-3 sm:mt-0" key={index}>
//                     {/* Show modal button for desktop version */}
//                     <FontAwesomeIcon
//                       icon={faPlusCircle}
//                       className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-800 mr-2"
//                       onClick={() => setShowModal(true)}
//                     />
//                   </div>
//                 );
//               }
//             })}
//           </nav>

//           {/* Mobile menu button */}
//           <div className="sm:hidden relative inline-block">
//             <button
//               id="dropdownDefaultButton"
//               data-dropdown-toggle="dropdown"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               type="button"
//               onClick={toggleMobileMenu}
//             >
//               Dropdown button{" "}
//               <svg
//                 className="w-4 h-4 ml-2"
//                 aria-hidden="true"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 9l-7 7-7-7"
//                 ></path>
//               </svg>
//             </button>
//             {mobileMenuOpen && (
//               <div
//                 id="dropdown"
//                 className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
//               >
//                 <ul
//                   className="py-2 text-sm text-gray-700 dark:text-gray-200"
//                   aria-labelledby="dropdownDefaultButton"
//                 >
//                   {/* Array map the buttons*/}
//                   {plannerButtons.map((button, index) => {
//                     // Map all the buttons
//                     if (button !== "Add New Routine") {
//                       return (
//                         <li key={index}>
//                           <a
//                             href="#"
//                             className={`block font-bold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${activeTab === index ? "text-blue-500" : ""
//                               }`}
//                             onClick={() => handleTabChange(index)}
//                           >
//                             {button}
//                           </a>
//                         </li>
//                       );
//                     } else {
//                       return (
//                         <li key={index}>
//                           <a
//                             href="#"
//                             className="block font-bold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                             onClick={() => {
//                               setShowModal(true);
//                             }}
//                           >
//                             {button}
//                           </a>
//                         </li>
//                       );
//                     }
//                   })}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Grid act as the container here */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 place-items-center px-5 md:px-10 lg:px-16">
//           {/* Render content based on active tab */}
//           {activeTab === 0 && routineCards.map((routineCard, index) => (
//             <CardPlanner key={index} routineInfo={routineCard} deleteCard={handleDelete} />
//           ))}
//           {activeTab === 1 && otherUserRoutineCards.map((routineCard, index) => (
//             <CardPlanner key={index} routineInfo={routineCard} />
//           ))}
//           {activeTab === 2 && pastRoutinesCards.map((routineCard, index) => (
//             // <CardPlanner key={index} routineInfo={routineCard} />
//             routineCard.id
//           ))}
//         </div>

//       </div>

//       <Modal templateExercises={templateExercises} isOpen={showModal} onClose={() => setShowModal(false)} />
//     </div>
//   );
// }

// export default Planner;


import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPlusCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// Import components
import Modal from "../component/Modal";
import baseAxios from "../axios/baseAxios";

// Components
import CardPlanner from "../component/CardPlanner";
import { useSelector } from "react-redux";
import axios from "axios";
import Swaf from "sweetalert2"
import CardHistory from "../component/CardHistory";
import Loading from "../component/Loading";
function Planner() {
  const navigate = useNavigate();
  const [usernameDetails, setUsernameDetails] = useState(
    {
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token"),
    }
  );

  // Loading
  const [isLoading, setIsLoading] = useState(true);



  // Template buttons
  const [plannerButtons, setPlannerButtons] = useState(["My Routines", "Other Routines", "Past Routines", "Add New Routine"]);
  // Local state for past routines
  const [pastRoutinesCards, setPastRoutinesCards] = useState([]);

  const [searchQueryMyRoutines, setSearchQueryMyRoutines] = useState("");
  const [searchQueryOtherRoutines, setSearchQueryOtherRoutines] = useState("");
  const [searchQueryPastRoutines, setSearchQueryPastRoutines] = useState("");
  // === Tabs ===
  // Active tab state
  const [activeTab, setActiveTab] = useState(0);
  // Change tabs
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  //  === Modal local states ===
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  // === Local states for routine cards ===
  const [routineCards, setRoutineCards] = useState([]);
  const [otherUserRoutineCards, setOtherUserRoutineCards] = useState([]);

  const handleDelete = (username, routineName) => {
    // Delete routine from database
    baseAxios.delete(`/routine/?username=${username}&name=${routineName}`)
      .then((response) => {
        console.log(response);
        // Delete routine from state
        setRoutineCards((prevState) => {
          return prevState.filter((routine) => {
            return routine.name !== routineName;
          });
        });

        // Show success message
        Swaf.fire({
          icon: "success",
          title: "Deletion successful",
          html: `Your routine <b>${routineName}</b> has been deleted`,
          showConfirmButton: true,
        });

      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Database data
  useEffect(() => {
    setIsLoading(true); // Start loading

    // Fetch data from database
    if (activeTab == 0) {
      console.log("active tab is 0")
      // Fetch user tabs
      console.log(usernameDetails.username);
      baseAxios
        .get(`/routine/user/${usernameDetails.username}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(" i am called")
          // Get routines of user here 
          console.log(usernameDetails.username)
          console.log(response.data.data);
          setRoutineCards(response.data.data);
          setTimeout(() => {
            setIsLoading(false);
            
          }, 2000);

        })
        .catch((error) => {
          console.log(error);
        });
  
    }

    if (activeTab == 1) {
      // Fetch other user data

      // Fetch OTHER user data
      baseAxios
        .get(`/routine`, {
          withCredentials: true,
        })
        .then((response) => {
          // Get routines of user here 
          // Get routines of user here 
          console.log(response.data.data, "i am in tab 1");
          // Filter out the routines that are not usernameDetails.username
          // Filter out the routines that are not created by a specific user
          console.log(usernameDetails.username, "username details")
          const filteredRoutines = response.data.data.filter((routine) => {
            return routine.createdBy != usernameDetails.username; // Replace 'yourUsername' with the desired username
          });

          console.log(filteredRoutines, "filtered routines")

          setOtherUserRoutineCards(filteredRoutines);
          setIsLoading(false);

        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (activeTab === 2) {
      // Fetch past routines data (replace with your logic)
      baseAxios
        .get(`/completedRoutine/user/${localStorage.getItem("username")}`, {
          withCredentials: true,
        })
        .then((response) => {
          // Set past routines data here
          console.log(response.data.data, "past routines data")
          setPastRoutinesCards(response.data.data);
          setIsLoading(false);

        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [activeTab]);

  // Template data
  const [templateExercises, setTemplateExercises] = useState([]);
  // Database template data
  useEffect(() => {
    // Fetch data from the database
    baseAxios.get(`/routine/templates`, {
      withCredentials: true,
    })
      .then((response) => {
        console.log("tempalte data", response.data.data);
        setTemplateExercises(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        // Handle the error here, such as displaying an error message or setting a default value for the state
      });
  }, []);

  return (
    <div>

      {/* Loading screen */}
      {isLoading? (
        <Loading />
      ): (

      <div>
        {/* Planner page */}
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center m-10 p-2">
          Welcome to the Routines Page
        </h1>

        {/* Tab bar to filter between my Routines, favourites and other people routines */}
        <div className="flex justify-center mb-11">
          <nav className="hidden sm:flex flex-wrap justify-center sm:justify-start space-x-0 sm:space-x-10">
            {/* Desktop navigation items */}
            {/* Array map the buttons*/}
            {plannerButtons.map((button, index) => {
              if (button !== "Add New Routine") {
                return (
                  <button
                    key={index}
                    className={`text-xl text-gray-500 hover:text-gray-800 focus:outline-none ${activeTab === index ? "border-b-2 border-blue-500" : ""
                      }`}
                    onClick={() => handleTabChange(index)}
                  >
                    {button}
                  </button>
                );
              } else {
                return (
                  <div className="flex items-center mt-3 sm:mt-0" key={index}>
                    {/* Show modal button for desktop version */}
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-800 mr-2"
                      onClick={() => setShowModal(true)}
                    />
                  </div>
                );
              }
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="sm:hidden relative inline-block">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={toggleMobileMenu}
            >
              Dropdown button{" "}
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {mobileMenuOpen && (
              <div
                id="dropdown"
                className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {/* Array map the buttons*/}
                  {plannerButtons.map((button, index) => {
                    // Map all the buttons
                    if (button !== "Add New Routine") {
                      return (
                        <li key={index}>
                          <a
                            href="#"
                            className={`block font-bold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${activeTab === index ? "text-blue-500" : ""
                              }`}
                            onClick={() => handleTabChange(index)}
                          >
                            {button}
                          </a>
                        </li>
                      );
                    } else {
                      return (
                        <li key={index}>
                          <a
                            href="#"
                            className="block font-bold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => {
                              setShowModal(true);
                            }}
                          >
                            {button}
                          </a>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Searchbar */}


        <div className="px-5 md:px-10 lg:px-16">
          {/* Search bar */}
          <div className="mb-4 w-full">
            <input
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Search Routines"
              value={activeTab === 0 ? searchQueryMyRoutines : activeTab === 1 ? searchQueryOtherRoutines : searchQueryPastRoutines}
              onChange={(e) => {
                if (activeTab === 0) {
                  setSearchQueryMyRoutines(e.target.value);
                } else if (activeTab === 1) {
                  setSearchQueryOtherRoutines(e.target.value);
                } else {
                  setSearchQueryPastRoutines(e.target.value);
                }
              }}
            />
          </div>

          <div>
            <p className="text-xl text-start font-bold mb-2">Search results: {activeTab === 0 ? routineCards.filter((routine) => routine.name.toLowerCase().includes(searchQueryMyRoutines.toLowerCase())).length : activeTab === 1 ? otherUserRoutineCards.filter((routine) => routine.name.toLowerCase().includes(searchQueryOtherRoutines.toLowerCase())).length : pastRoutinesCards.filter((routine) => routine.routineName.toLowerCase().includes(searchQueryPastRoutines.toLowerCase())).length}</p>
          </div>

          {/* Grid for routine cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 place-items-center">
            {/* My Routines Tab */}
            {activeTab === 0 && (
              <>
                {routineCards
                  .filter((routine) => routine.name.toLowerCase().includes(searchQueryMyRoutines.toLowerCase()))
                  .map((routineCard, index) => (
                    <CardPlanner key={index} routineInfo={routineCard} deleteCard={handleDelete} />
                  ))}
                {routineCards.length === 0 && (
                  <div className="col-span-5">
                    <p className=" text-center mt-4">
                    <span className="flex justify-center items-center h-full text-lg font-bold">
                        No routines found! 🥺
                      </span>
                    </p>

                  </div>)}
              </>
            )}

            {/* Other Routines Tab */}
            {activeTab === 1 && (
              <>
                {otherUserRoutineCards
                  .filter((routine) => routine.name.toLowerCase().includes(searchQueryOtherRoutines.toLowerCase()))
                  .map((routineCard, index) => (
                    <CardPlanner key={index} routineInfo={routineCard} />
                  ))}
                {otherUserRoutineCards.length === 0 && (
                  <div className="col-span-5">
                    <p className=" text-center mt-4">
                      <span className="flex justify-center items-center h-full text-lg font-bold">
                      No routines found! 🥺
                      </span>
                    </p>

                  </div>)}
              </>
            )}

            {/* Past Routines Tab */}
            {activeTab === 2 && (
              <>
                {pastRoutinesCards
                  .filter((routine) => routine.routineName.toLowerCase().includes(searchQueryPastRoutines.toLowerCase()))
                  .map((routineCard, index) => (
                    <CardHistory key={index} histories={routineCard} />
                  ))}
                {pastRoutinesCards.length === 0 && (
                  <div className="col-span-5">
                    <p className=" text-center mt-4">
                    <span className="flex justify-center items-center h-full text-lg font-bold">
                    No routines found! 🥺
                      </span>
                    </p>

                  </div>
                )}
              </>
            )}
          </div>
        </div>



      </div>

      )}
      

      <Modal templateExercises={templateExercises} isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default Planner;

