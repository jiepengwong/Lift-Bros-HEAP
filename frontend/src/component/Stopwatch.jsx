import React from 'react'
import PropTypes from 'prop-types';

function Stopwatch({ elapsedTime }) {
    const formatTime = (timeInSeconds) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;
  
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');
  
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };
  
    return (
      <div className="text-xl font-bold">
        Elapsed Time: {formatTime(elapsedTime)}
      </div>
    );
  }
  
  Stopwatch.propTypes = {
    elapsedTime: PropTypes.number.isRequired,
  };
  
export default Stopwatch
