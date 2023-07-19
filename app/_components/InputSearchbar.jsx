import React from "react";
import { FaSearch } from "react-icons/fa";
const InputSearchbar = () => {
  return (
    <div className="bg-purple-0 w-full md:w-2/3 p-2 rounded-md flex gap-5 items-center px-5 border-[1px]">
      <FaSearch className="text-purple-600 text-xl md:text-2xl" />
      <input
        type="search"
        placeholder="Enter mosque name"
        className="outline-none focus:border-0 p-2 rounded-md w-full bg-purple-0 text-sm placeholder:text-purple-300"
      />
    </div>
  );
};

export default InputSearchbar;
