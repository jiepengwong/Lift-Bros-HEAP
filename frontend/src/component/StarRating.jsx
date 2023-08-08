import React, { useState } from "react";

function StarRating(onChange) {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div className="bg-gray-200 rounded-lg p-4">
      <p className="font-bold text-xl">Intensity rating</p>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`text-gray-400 text-3xl ${
            value <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => handleStarClick(value)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
