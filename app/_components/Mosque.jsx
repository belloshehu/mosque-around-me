"use client";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { Righteous } from "next/font/google";
import Link from "next/link";
import mosqueImage from "../_images/mosque.png";
import { BsBell } from "react-icons/bs";
import { TbUsersPlus } from "react-icons/tb";
import DistanceList from "./DistanceList";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });
const Mosque = ({ name, image, address, city, state, country, _id }) => {
  return (
    <Link href={`/mosque/${_id}`} className="w-full">
      <div className="relative flex items-center gap-3 w-full group hover:scale-105 duration-150 transition-all group p-2 border-[2px] hover:text-white rounded-md md:w-2/3">
        <Image
          src={image || mosqueImage}
          alt={name}
          height={150}
          className="object-contain w-1/2 bg-slate-300 rounded-e-md h-full"
        />
        <div className="flex flex-col items-start transition-all duration-250 gap-1 p-2 text-left text-black w-full">
          <p className={`w-full font-semibold`}>{name}</p>
          <div className="flex items-center gap-2  w-full text-slate-500">
            <small>{address}</small>
          </div>
          <div className="flex items-center gap-2 font-thin text-slate-500 w-full">
            <small>{city},</small>
            <small>{state},</small>
            <small>{country}</small>
          </div>
          <div className="flex flex-col md:flex-row-reverse w-full justify-between">
            <div className="flex space-x-3 text-primary text-lg items-end mt-2">
              <AiOutlineHeart />
              <BsBell />
              <TbUsersPlus />
            </div>
            <div className="flex space-x-6 text-primary text-2xl items-end mt-6">
              <DistanceList />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Mosque;
