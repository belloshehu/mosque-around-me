"use client";
import axios from "axios";
import mosqueImage from "../../_images/mosque.png";
import avatarImage from "../../_images/avatar.jpg";
import Image from "next/image";
import { FaMapMarkerAlt, FaPen } from "react-icons/fa";
import { styles } from "../../styles";
import Link from "next/link";
import PrayerTimeTable from "../../_components/PrayerTimeTable";

const getMosque = async (id) => {
  let mosque = null;
  try {
    const { data } = await axios.get(`http://localhost:3000/api/mosque/${id}`);
    mosque = await data.mosque;
  } catch (error) {
    console.log(error);
  }
  return mosque[0];
};

const MosqueDetailPage = async ({ params }) => {
  const { id } = params;
  const mosque = await getMosque(id);

  return (
    <div className="min-h-screen w-full">
      <header className="h-[250px] lg:h-[400px] w-full relative text-white rounded-md">
        <FaPen className="absolute top-5 right-5 z-10 bg-slate-400 p-1 w-10 h-10 rounded-full text-xl lg:text-3xl" />
        <Image
          src={mosque?.image || mosqueImage}
          alt="mosque"
          className="w-full h-full object-cover rounded-md"
        />
        <Image
          src={mosque?.image || mosqueImage}
          alt="mosque"
          className="absolute left-5 -bottom-10 ring-0  rounded-full z-10 object-cover bg-slate-300 w-[70px] h-[70px] lg:w-[150px] lg:h-[150px]"
        />
        <div className="flex flex-col gap-3 text-white justify-center items-center text-center w-full h-full bg-black bg-opacity-60 absolute top-0 left-0 rounded-md">
          <h2 className="font-bold lg:font-extrabold text-white text-2xl lg:text-5xl">
            {mosque?.name}
          </h2>
          <div className="flex gap-2 items-center text-xl">
            <FaMapMarkerAlt className="text-2xl text-white" />
            <p>{mosque?.address}</p>
          </div>
          <div className="flex gap-2 items-center">
            <small>
              {mosque?.city}, {mosque?.state}, {mosque?.country}
            </small>
          </div>
        </div>
        <div className="absolute -bottom-10 lg:-bottom-20  text-slate-700 bg-slate-100 lg:bg-none right-0 flex gap-2 justify-center items-center border-0 p-2 rounded-l-md">
          <Image
            src={mosque?.user?.image || avatarImage}
            alt={mosque?.user?.firstName}
            className="w-10 h-10 lg:w-10 lg:h-10 ring-2 ring-purple-950 rounded-full"
          />
          <div className="flex flex-col">
            <small>
              {mosque?.user?.firstName} {mosque?.user?.otherName}
            </small>
            <small>{mosque?.user?.phoneNumber}</small>
            <small className="text-slate-400 text-left italic">
              Mosque Admin
            </small>
          </div>
        </div>
        {/* <MosqueAdmin user={mosque.user} /> */}
      </header>
      {/* body */}

      <div className="flex flex-col gap-5 justify-around w-full mt-10">
        <article className="flex flex-col gap-4 text-left  my-5 lg:my-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg border-b-4 border-slate-500 text-purple-800">
              Prayer time table
            </h3>

            <Link
              href={`/prayer/create/${mosque?._id}`}
              className={`${styles.buttonFluidPlain} bg-purple-950 `}>
              Add prayer
            </Link>
          </div>

          {/* time table here: list of prayers */}
          <PrayerTimeTable prayers={mosque?.prayers} user={mosque.user} />
        </article>
        <article className="flex flex-col gap-4 text-left  my-5 lg:my-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg border-b-4 border-slate-500 mb-4 text-purple-800">
              Programs
            </h3>
          </div>
          <div className="">{/* list of programs here */}</div>
        </article>
      </div>
    </div>
  );
};

export default MosqueDetailPage;
