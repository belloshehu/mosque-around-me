import React from "react";
import { FaHeart } from "react-icons/fa";

const CategoryFilterItem = ({ text, icon }) => {
  return (
    <div className="p-5 relative rounded-md border-2 hover:bg-purple-50 flex flex-col space-y-2 items-center text-sm group text-center">
      <span className="text-purple-600 text-xl">{icon}</span>
      <h4>{text}</h4>
      <div className="absolute top-0 right-2">
        <FaHeart className="text-purple-200 group-hover:text-purple-500" />
      </div>
    </div>
  );
};

export default CategoryFilterItem;
