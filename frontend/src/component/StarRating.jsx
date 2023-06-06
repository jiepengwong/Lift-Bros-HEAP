import React, { useState } from "react";

function StarRating() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div>
      <p className="font-bold">Intensity rating</p>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`text-yellow-400 ${
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