import React from "react";
import GreyBox from "../component/GreyBox";
import StarRating from "../component/StarRating";
import Notes from "../component/Notes";
import Button from "../component/Button";

function Endpage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h1 className="text-xl sm:text-lg lg:text-4xl font-bold text-center m-2 p-3">
          Congratulations, you have just completed Back and Legs Workout! 🎉
        </h1>
      </div>
      <div className="flex justify-center">
        <GreyBox text="Total time elapsed:" data="1:03:48" />
        <GreyBox text="Total est. calories burnt:" data="510 kJ" />
      </div>
      <div className="flex justify-center">
        <StarRating />
        <div className="w-72"></div> {/* Custom gap width */}
        <Notes />
      </div>
      <div className="flex justify-center">
        <Button text="Save & back to home" />
      </div>
    </div>
  );
}

export default Endpage;
