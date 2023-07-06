import React from "react";
import GreyBox from "../component/GreyBox";
import StarRating from "../component/StarRating";
import Notes from "../component/Notes";
import Button from "../component/Button";
import { Link } from "react-router-dom";

function Endpage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl sm:text-lg lg:text-3xl font-bold text-center m-2 p-4">
        Congratulations, you have just completed Back and Legs Workout! 🎉
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="mr-4">
          <GreyBox text="Total time elapsed:" data="1:03:48" />
        </div>
        <div className="ml-4">
          <GreyBox text="Total est. calories burnt:" data="510 kJ" />
        </div>
        <div className="col-span-2 flex justify-center">
          <StarRating />
        </div>
        <div className="col-span-2">
          <Notes />
        </div>
      </div>

      <div className="flex justify-center p-4">
        <Link to="/">
          <Button text="Save & back to home" />
        </Link>
      </div>
    </div>
  );
}

export default Endpage;
