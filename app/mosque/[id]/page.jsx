"use client";
import axios from "axios";
import mosqueImage from "../../_images/mosque.png";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { styles } from "../../styles";
import Link from "next/link";

const getMosque = async (id) => {
  let mosque = null;
  try {
    const { data } = await axios.get(`/api/mosque/${id}`);
    mosque = await data.mosque;
  } catch (error) {
    console.log(error);
  }
  return mosque;
};

const MosqueDetailPage = async ({ params }) => {
  console.log(params.id);
  const mosque = await getMosque(params.id);
  return (
    <div className="min-h-screen w-full">
      <header className="h-[200px] lg:h-[300px] w-full relative">
        <Image
          src={mosqueImage}
          alt="mosque"
          className="w-full h-full object-cover"
        />
        <div className="flex flex-col gap-3 text-white justify-center items-center text-center w-full h-full bg-black bg-opacity-70 absolute top-0 left-0 ">
          <h2 className="font-bold text-white text-xl lg:text-3xl">
            {mosque.name}
          </h2>
          <div className="flex gap-2 items-center">
            <FaMapMarkerAlt className="text-2xl text-purple-600" />
            <p>{mosque.address}</p>
          </div>
          <div className="flex gap-2 items-center">
            <small>
              {mosque.city}, {mosque.state}, {mosque.country}
            </small>
          </div>
        </div>
      </header>
      {/* body */}

      <div className="flex flex-col gap-5 justify-around w-full">
        <article className="flex flex-col gap-4 text-left  my-5 lg:my-10">
          <h3 className="text-lg border-b-4 border-slate-500 mb-4 w-fit text-purple-800">
            Prayer Time table
          </h3>
          <div>
            <Link
              href={"/timetable/create"}
              className={`${styles.buttonFluidPlain} bg-purple-950 `}>
              Add time table
            </Link>
          </div>
        </article>
        <article className="flex flex-col gap-4 text-left  my-5 lg:my-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg border-b-4 border-slate-500 mb-4 text-purple-800">
              Programs
            </h3>
          </div>
          <div className="">
            <Link
              href={"/program/create"}
              className={`${styles.buttonFluidPlain} bg-purple-950 `}>
              Add program
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default MosqueDetailPage;
