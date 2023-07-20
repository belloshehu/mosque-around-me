"use client";

const DistanceListItem = ({ icon, text }) => {
  return (
    <li className=" hover:bg-purple-400 group text-lg gap-2 border-[1px] hover:text-white text-purple-600 rounded-md p-2 flex flex-col items-center">
      <span className="group-hover:scale-105 transition-all duration-150">
        {icon}
      </span>
      <small className="text-xs text-slate-700">{text}</small>
    </li>
  );
};

export default DistanceListItem;
