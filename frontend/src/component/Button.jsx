import React from "react";

function Button({ text, onClick }) {
  return (
    // <button onClick={onClick} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-5">
    //   {text}
    // </button>
    <div className="mx-2 my-2 px-2 sm:px-6">
    <button
      onClick={onClick}
      className="inline-block bg-yellow-500 rounded-full transition duration-150 ease-in-out hover:bg-yellow-600 text-black font-bold px-6 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
    >
      {text}
    </button>
  </div>
  
  );
}

export default Button;
