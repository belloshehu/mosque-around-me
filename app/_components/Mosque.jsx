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
      className="flex flex-col items-center gap-1 border-[1px] rounded-md w-full hover:scale-105 duration-150 transition-all">
      <Image src={image} height={300} className="w-full" />
      <h3
        className={`${righteous.className} font-semibold text-transparent bg-clip-text text-slate-700 text-xl`}>
        {name}
      </h3>
      <div className="flex flex-col gap-2 p-5 lg:px-7 bg-slate-50 w-full text-slate-600">
        <div className="flex items-center justify-center text-center gap-2">
          <FaMapMarkerAlt className="" />
          <p>{address}</p>
        </div>
        <div className="flex items-center justify-center gap-2 font-thin text-center">
          <span>{city},</span>
          <span>{state},</span>
          <span>{country}</span>
        </div>

        <div className="flex justify-around items-center bg-white w-full p-2">
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
