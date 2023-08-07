import React from "react";

function Button({ text, onClick }) {
  return (
    // <button onClick={onClick} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-5">
    //   {text}
    // </button>
    <div className="mx-2 my-2 px-6 flex flex-wrap">
      <button
        onClick={onClick}
        className="mx-2 my-2 bg-yellow-500 transition duration-150 ease-in-out hover:bg-yellow-600 rounded text-black font-bold px-8 py-3 text-m focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-indigo-600"
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
