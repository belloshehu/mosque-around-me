import React from "react";

const MenubarItem = ({ icon }) => {
  return (
    <li className=" hover:bg-purple-500 hover:scale-110 text-xl transition-slow hover:text-white text-primary rounded-md p-4">
      {icon}
    </li>
  );
};

export default MenubarItem;
