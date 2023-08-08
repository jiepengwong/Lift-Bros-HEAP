import React from 'react'

const Loading = () => {
    return (
      <div className="loading-overlay">
        <div className="loader-container">
          <div className="barbell">
            <div className="bar">
              <div className="plate plate-top"></div>
              <div className="plate plate-bottom"></div>
            </div>
          </div>
        </div>
        <h2 className="loading-text">Getting Fit...</h2>
        <p className="loading-description">Stay strong, your data is on its way!</p>
      </div>
    );
  };
export default Loading