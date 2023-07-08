"use client";
import { useSelector } from "react-redux";

const Prayer = () => {
  const { selectedPrayer } = useSelector((store) => store.prayer);
  const { _id, title, adhaanTime, iqaamaTime, imamName } = selectedPrayer;
  return (
    <div className="table border-spacing-1 border-2 rounded-md p-5 w-full">
      <div className="table-row ">
        <p className="table-cell">Title</p>
        <p className="table-cell text-right  text-black p-2  border-2 rounded-md">
          {title}
        </p>
      </div>
      <div className="table-row">
        <p className="table-cell">Adhaan</p>
        <p className="table-cell text-right text-black p-2  border-2 rounded-md">
          {adhaanTime}
        </p>
      </div>
      <div className="table-row">
        <p className="table-cell">Iqaama</p>
        <p className="table-cell text-right text-black p-2  border-2 rounded-md">
          {iqaamaTime}
        </p>
      </div>
      <div className="table-row">
        <p className="table-cell">Imam</p>
        <p className="table-cell text-right  text-black p-2  border-2 rounded-md">
          {imamName}
        </p>
      </div>
    </div>
  );
};

export default Prayer;
