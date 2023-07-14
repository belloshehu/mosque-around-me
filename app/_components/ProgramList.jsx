"use client";
import ProgramListItem from "../_components/ProgramListItem";
import { useSession } from "next-auth/react";

const ProgramList = ({ programs, user }) => {
  const { data: session } = useSession();
  console.log("progrs, ", programs);
  return (
    <div className="h-full w-full lg:w-2/3 mx-auto">
      <div className="flex flex-col gap-12">
        {programs?.map((program) => (
          <ProgramListItem
            key={program._id}
            program={program}
            mosque_id={program.mosque}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgramList;
