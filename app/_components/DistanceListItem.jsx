"use client";

const DistanceListItem = ({ icon, text }) => {
  return (
    <li className="relative hover:bg-purple-400 group gap-4 border-[0px] bg-slate-200 hover:text-white text-purple-600 rounded-md p-2 flex flex-col items-center">
      <span className="group-hover:scale-105 transition-all duration-150 text-lg">
        {icon}
      </span>
      <small className="text-xs text-slate-700 absolute -top-3 -right-2 z-10 bg-purple-200 p-1 rounded-full">
        {text}
      </small>
    </li>
  );
};

export default DistanceListItem;
