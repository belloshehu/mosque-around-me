import React from "react";

const MenubarItem = ({ icon }) => {
  return (
    <li className=" hover:bg-purple-400 hover:scale-110 text-xl transition-slow hover:text-white text-purple-600 rounded-md p-4">
      {icon}
    </li>
  );
};

export default MenubarItem;
