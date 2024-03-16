import React from "react";

const IslamicDate = ({ month, monthPosition, day, year }) => {
  return (
    <div className="relative rounded-md p-6 bg-white flex flex-col gap-5 justify-center items-center w-full">
      <h1>
        {month}({monthPosition})
      </h1>
      <small className="absolute -top-2 right-0 bg-slate-50 p-1 shadow-md">
        {year}
      </small>
      <div className="bg-slate-200 p-2 px-5 shadow-md rounded-sm">
        <h1 className="text-5xl font-extrabold text-green-600">{day}</h1>
      </div>
    </div>
  );
};

export default IslamicDate;
