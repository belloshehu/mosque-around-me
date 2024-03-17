import React from "react";

export const Notification = ({ title, message, from, type, createdAt }) => {
  return (
    <div
      className={
        type === "danger"
          ? "bg-red-200 rounded-md w-full p-3 md:p-5 flex flex-col gap-2 shadow-md"
          : "bg-green-50 rounded-md w-full p-3 md:p-5 flex flex-col gap-2 shadow-md"
      }>
      <h3 className="font-semibold">{title}</h3>
      <p>{message}</p>
      <div className=" bg-slate-0 w-fit my-2">
        <small className="italic">
          {new Date(createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};
