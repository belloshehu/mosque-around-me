"use client";
import PrayerTableRow from "./PrayerTableRow";
import { useSession } from "next-auth/react";

const PrayerTimeTable = ({ prayers, user }) => {
  const { data: session } = useSession();
  return (
    <div className="w-full lg:w-2/3 mx-auto">
      <div className="flex flex-col gap-12">
        {prayers?.map((prayer) => (
          <PrayerTableRow
            key={prayer._id}
            prayer={prayer}
            mosque_id={prayer.mosque}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default PrayerTimeTable;
