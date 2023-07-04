import React from 'react';

function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-5">
      {text}
    </button>
  );
}

export default Button;
