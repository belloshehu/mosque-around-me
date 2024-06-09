"use client";
import React, { memo, useEffect, useState } from "react";
import { cn, getAPIPayload } from "../utils/api";

const renderedDate = (date) => {
  if (!date) return null;
  return (
    <div className="w-full">
      <small className="absolute -top-1 right-0 bg-white p-1 shadow-2xl text-primary w-full text-center">
        {date?.date} AH {date?.month?.ar}
      </small>
      <div className="bg-primary p-2 px-5 shadow-md rounded-sm text-center w-full text-white">
        <h1 className="text-2xl md:text-5xl font-extrabold text-white">
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
