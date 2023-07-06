"use client";
import Prayer from "./Prayer";
import { useSession } from "next-auth/react";

const PrayerTimeTable = ({ prayers, user }) => {
  const { data: session } = useSession();
  return (
    <div>
      <table className="table-auto border-2 ">
        <thead className="bg-purple-950 text-white">
          <tr>
            <th>Title</th>
            <th>Adhaan Time</th>
            <th>Iqaama Time</th>
            <th>Imam</th>
            {/* show action edit and delete actions for admins only */}
            {session?.user.email === user.email ? (
              <th colSpan={2}>Action</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {prayers?.map((prayer) => (
            <Prayer key={prayer._id} prayer={prayer} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrayerTimeTable;
