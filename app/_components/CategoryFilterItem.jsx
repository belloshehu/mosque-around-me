"use client";
import { FaHeart } from "react-icons/fa";

const CategoryFilterItem = ({ text, icon }) => {
  return (
    <div className="p-5 relative rounded-md border-2 hover:bg-gray-50 flex flex-col space-y-2 items-center text-sm group text-center">
      <span className="text-primary text-xl">{icon}</span>
      <h4>{text}</h4>
      <div className="absolute top-0 right-2">
        <FaHeart className="text-gray-200 group-hover:text-primary" />
      </div>
    </div>
  );
};

export default CategoryFilterItem;
