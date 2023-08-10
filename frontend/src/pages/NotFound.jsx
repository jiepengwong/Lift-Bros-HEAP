import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const NotFound = () => {
    const location = useLocation();
    const routeName = location.pathname; // Get the route name that was not found

    return (
        <div className="bg-yellow-100 flex flex-col h-screen">
        {/* Top section with yellow background */}
        <div className="h-20 px-2 2xl:px-16 flex items-center justify-between bg-yellow-300">
          {/* Your existing content for the top section */}
        </div>
        
        {/* Centered main content section */}
        <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Oops 😲! <br /> Page Not Found
          </h1>
          
          {/* Placeholder picture */}
          <img
            src={require("../assets/notfound.webp")}
            alt="404 Placeholder"
            className="mt-6 w-40 md:w-60 lg:w-80 rounded-lg"
          />
  
          <p className="text-lg text-gray-600 mt-4">
            It looks like you've ventured into uncharted territory.
          </p>
          <p className="text-base text-gray-600 mt-2">
            The route <span className="font-bold">{routeName}</span> does not exist.
          </p>
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mt-6">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
  
    );
};

export default NotFound;
