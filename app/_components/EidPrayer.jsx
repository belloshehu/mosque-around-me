import { transformDate } from "../utils/date";
import { FaUser, FaClock, FaCalendar } from "react-icons/fa";
import Image from "next/image";

export default function EidPrayer({ mosqueName, time, date, imamName }) {
  return (
    <article className="flex items-center justify-start gap-4 p-2 border-[1px] border-gray-300 last:border-none">
      <Image
        src={"/mosque.png"}
        alt="mosque"
        className="w-16 h-16 rounded-full ring-1 ring-primary"
        width={20}
        height={20}
      />
      <div className="flex flex-col items-start">
        <h3 className="text-primary capitalize p-0 m-0 font-semibold">
          {mosqueName}
        </h3>
        <div className="flex items-center gap-2 justify-start text-primary">
          <small className="flex items-center gap-2">
            <FaClock /> {time}
          </small>
          <small className="flex items-center gap-2">
            <FaCalendar />
            {transformDate(date)}
          </small>
        </div>
        <small className="flex items-center gap-2">
          {" "}
          <span className="text-primary">
            <FaUser />
          </span>
          By {imamName}
        </small>
      </div>
    </article>
  );
}
