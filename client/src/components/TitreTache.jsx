import React from "react";
import clsx from "clsx";
import { IoMdAdd } from "react-icons/io";

const TitreTache = ({ label, className, onFilter }) => {
  const handleClick = () => {
    onFilter(label);  // Call parent function to filter by phase
  };

  return (
    <div
      onClick={handleClick}  // Trigger filter on click
      className="w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white flex items-center justify-between cursor-pointer"
    >
      <div className="flex gap-2 items-center">
        <div className={clsx("w-4 h-4 rounded-full", className)} />
        <p className="text-sm md:text-base text-gray-600">{label}</p>
      </div>
      <button className="hidden md:block">
        <IoMdAdd className="text-lg text-black" />
      </button>
    </div>
  );
};

export default TitreTache;
