import React from 'react'

const Loading = () => {
    return (
      <div className="loading-overlay">
        <div className="loader"></div>
        <h2 className="loading-text">Loading...</h2>
        <p className="loading-description">This may take a few seconds, please don't close this page.</p>
      </div>
    );
  };

export default Loading