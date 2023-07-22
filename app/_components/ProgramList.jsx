"use client";
import ProgramListItem from "../_components/ProgramListItem";

const ProgramList = ({ programs, user }) => {
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
