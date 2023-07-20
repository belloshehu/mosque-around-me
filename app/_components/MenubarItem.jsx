"use client";

const MenubarItem = ({ icon, text }) => {
  return (
    <li className="flex items-center group hover:gap-3 gap-0 relative hover:bg-purple-400 hover:scale-[102%] text-xl transition-all duration-150 hover:text-white text-purple-600 rounded-md p-4 py-3 w-full">
      <span className="text-3xl">{icon}</span>
      <span className="group-hover:scale-95 group-hover:text-white scale-75 text-purple-400 w-full">
        {text}
      </span>
    </li>
  );
};

export default MenubarItem;
