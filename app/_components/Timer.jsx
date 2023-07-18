import React, { useEffect, useState } from "react";
import { secondsToHours, secondsToMinutes } from "../utils/timeConverter";
import { FaStopwatch } from "react-icons/fa";

const Timer = ({ duration, setDuration }) => {
  useEffect(() => {
    let timer = null;
    if (duration > 0) {
      timer = setInterval(() => {
        setDuration((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [duration]);
  return (
    <div className="rounded-md text-center mb-4 p-3 w-full">
      <div className="flex justify-between items-center bg-purple-200 border-2 p-2 rounded-md">
        <small className="text-purple">Code expires in:</small>
        <h3 className="text-sm text-center">
          {secondsToHours(duration)}{" "}
          <span className="text-slate-600">hours</span> :{" "}
          {secondsToMinutes(duration)}{" "}
          <span className="text-slate-600">mins</span> : {duration % 60}{" "}
          <span className="text-slate-600">secs</span>
        </h3>
        <FaStopwatch className="text-green-600 text-lg animate-ping" />
      </div>
    </div>
  );
};

export default Timer;
