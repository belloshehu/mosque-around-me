"use client";
import Prayer from "./Prayer";

const PrayerTimeTable = ({ prayers }) => {
  return (
    <div>
      <table className="table-auto border-2 ">
        <thead>
          <tr>
            <th>Title</th>
            <th>Adhaan Time</th>
            <th>Iqaama Time</th>
            <th>Imam</th>
          </tr>
        </thead>
        <tbody>
          {prayers?.map((prayer) => (
            <Prayer key={prayer._id} prayer={prayer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimeTable;
