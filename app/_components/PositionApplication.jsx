import Image from "next/image";
import React from "react";

const PositionApplication = ({ application }) => {
  const { adminType, mosqueName, createdAt, verified, active } = application;
  return (
    <div className="flex flex-col gap-3 bg-slate-100 rounded-md w-full p-3">
      <p>
        Applied for{" "}
        <span className="font-semibold text-green-300">{adminType}</span>
      </p>
      <div className="bg-white rounded-md p-2 w-full">
        <div className="flex gap-2 justify-start items-center">
          <Image
            src={"/mosque.png"}
            alt="mosque"
            height={40}
            width={40}
            className="rounded-full "
          />
          <small>{mosqueName}</small>
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <small>{new Date(createdAt).toLocaleDateString()}</small>
        <small
          className={verified && active ? "text-green-400" : "text-red-500"}>
          {verified && active ? "Approved" : "Pending"}
        </small>
      </div>
    </div>
  );
};

export default PositionApplication;
