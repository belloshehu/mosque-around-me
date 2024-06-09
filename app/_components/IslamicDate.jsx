"use client";
import React, { memo, useEffect, useState } from "react";
import { cn, getAPIPayload } from "../utils/api";

const renderedDate = (date) => {
  return (
    <div className="w-full">
      <small className="absolute -top-1 right-0 bg-slate-50 p-1 shadow-md text-green-700 w-full text-center">
        {date?.date} AH {date?.month?.ar}
      </small>
      <div className="bg-slate-200 p-2 px-5 shadow-md rounded-sm text-center w-full">
        <h1 className="text-2xl md:text-5xl font-extrabold text-green-600">
          {date.day}
        </h1>
        <h1>{date?.month?.en}</h1>
      </div>
    </div>
  );
};

const IslamicDate = ({ className }) => {
  const isoDateString = new Date().toISOString();
  const [y, m, dStr] = isoDateString.split("-");
  const d = dStr.split("T")[0];
  const gregorianDate = `${d}-${m}-${y}`;
  const [date, setDate] = useState(null);

  const getHijriDate = async (greDate) => {
    const response = await getAPIPayload(
      `http://api.aladhan.com/v1/gToH/${greDate}`
    );
    setDate(response.data.hijri);
  };

  useEffect(() => {
    getHijriDate(gregorianDate);
  }, []);

  if (!date) return null;
  return (
    <div
      className={cn(
        "relative rounded-md py-5 flex flex-col gap-5 justify-center items-center w-full",
        className
      )}>
      {date ? renderedDate(date) : <h1>No date</h1>}
    </div>
  );
};

export default memo(IslamicDate);
