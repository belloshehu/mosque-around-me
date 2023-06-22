import Image from "next/image";
import { FaMapMarkerAlt, FaCalendar, FaClock } from "react-icons/fa";
import { Righteous } from "next/font/google";
const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });
import Link from "next/link";

const Mosque = ({
  name,
  image,
  address,
  city,
  state,
  country,
  date,
  time,
  id,
}) => {
  return (
    <Link
      href={`/mosque/${id}`}
      className="relative flex flex-col items-center gap-1 border-[1px] rounded-md h-full w-full group hover:scale-105 duration-150 transition-all">
      <Image
        src={image}
        height={500}
        className="w-full aspect-square  h-full object-contain"
      />
      <div className="absolute top-0 h-full hover:bg-opacity-0 hover:text-black  z-10 left-0 flex flex-col transition-all duration-250 justify-end items-center gap-2 p-5 lg:px-7 bg-opacity-50 bg-black w-full text-white">
        <h3
          className={`${righteous.className} absolute top-0 font-semibold  text-center text-xl`}>
          {name}
        </h3>
        <div className="flex items-center justify-center text-center gap-2">
          <FaMapMarkerAlt className="" />
          <p>{address}</p>
        </div>
        <div className="flex items-center justify-center gap-2 font-thin text-center">
          <span>{city},</span>
          <span>{state},</span>
          <span>{country}</span>
        </div>

        <div className="flex justify-around items-center bg-white bg-opacity-60 group-hover:bg-slate-400 w-full p-2">
          <div className="flex gap-1 items-center text-purple-700">
            <FaCalendar />
            <span>{date}</span>
          </div>
          <div className="flex gap-1 items-center text-purple-700">
            <FaClock />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Mosque;
