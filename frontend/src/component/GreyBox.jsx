import React from 'react';

function GreyBox({text, data}) {
  return (
  // <div>
  <div className="bg-gray-200 p-4 h-30 w-60 rounded-lg">
    <p className="font-bold text-xl tracking-tight text-centre">{text}</p>
    <br></br>
    <p className="font-bold tracking-tight text-centre">{data}</p>
  </div>
  );
}

export default GreyBox;