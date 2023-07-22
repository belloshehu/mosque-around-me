import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { Righteous } from "next/font/google";
import Link from "next/link";
import mosqueImage from "../_images/mosque.png";
import { BsBell } from "react-icons/bs";
import { TbUsersPlus } from "react-icons/tb";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });
const Mosque = ({ name, image, address, city, state, country, _id }) => {
  console.log(_id);
  return (
    <Link href={`/mosque/${_id}`} className="">
      <div className="relative flex items-center gap-3 w-full group hover:scale-105 duration-150 transition-all group p-2 border-[2px] hover:text-white rounded-md md:w-2/3">
        <Image
          src={image || mosqueImage}
          alt={name}
          height={150}
          className="object-contain w-1/2 bg-slate-300 rounded-e-md"
        />
        <div className="flex flex-col transition-all duration-250 gap-1 p-2 text-left text-black w-full">
          <p className={`w-full font-semibold`}>{name}</p>
          <div className="flex items-center gap-2  w-full text-slate-500">
            {/* <FaMapMarkerAlt className="text-purple-600" /> */}
            <small>{address}</small>
          </div>
          <div className="flex items-center gap-2 font-thin  text-slate-500">
            <small>{city},</small>
            <small>{state},</small>
            <small>{country}</small>
          </div>
          <div className="flex space-x-5 text-purple-600 text-2xl items-end mt-6">
            <AiOutlineHeart />
            <BsBell />
            <TbUsersPlus />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Mosque;
