import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

const VersesPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary">Verses</h2>
      <div className=" relative verses rounded-md w-full min-h-screen flex flex-col items-center justify-center mt-5">
        <div className="absolute -top-7 right-1 flex space-x-3">
          <Image
            src={"/quran.jpg"}
            width={100}
            height={100}
            className="rounded-full aspect-square object-cover ring-4 ring-purple-900 animate-bounce"
          />
          <Image
            src={"/quran1.jpg"}
            width={100}
            height={100}
            className="rounded-full aspect-square object-cover ring-4 ring-purple-900 animate-bounce"
          />
        </div>
        <div className="absolute left-2 top-2 flex flex-col items-center space-y-1 p-2 shadow-xl bg-purple-0">
          <div className="hover:bg-purple-300 group rounded-md p-2 slow-transition">
            <span className="absolute top-2 right-1 text-white">{0}</span>
            <AiOutlineHeart className="relative text-xl md:text-2xl text-white hover:scale-110 group-hover:text-purple-950" />
          </div>
          <div className="hover:bg-purple-300 rounded-md p-2 group slow-transition">
            <BsGear className="text-xl md:text-2xl text-white  hover:scale-110 group-hover:text-purple-950" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-purple-300 bg-opacity-50 rounded-md p-2">
          <div className="w-full h-full flex flex-col items-center justify-center rounded-md bg-black bg-opacity-40 relative">
            <p className="text-white text-center p-4">show verses here</p>

            {/* favorite section */}
            <div className="absolute -bottom-8 md:-bottom-12 right-0 p-2 hover:bg-purple-900 group rounded-md">
              <AiOutlineHeart className="relative text-2xl md:text-3xl text-purple-900 hover:scale-105 fast-transition group-hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersesPage;
