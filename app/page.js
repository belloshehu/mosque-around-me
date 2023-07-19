"use client";
import { Righteous, Poppins } from "next/font/google";
import InputSearchbar from "./_components/InputSearchbar";
import MosqueList from "./_components/MosqueList";
import LocationFilter from "./_components/LocationFilter";
import { useSelector } from "react-redux";
import Map from "./_components/Map";
import CategoryFilter from "./_components/CategoryFilter";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const { searchResultTitle, mosques } = useSelector((store) => store.mosque);
  return (
    <div
      className={`${poppins.className} grid grid-cols-1 md:grid-cols-2 min-h-screen w-full gap-4 p-5 overflow-x-hidden `}>
      <div className="w-full">
        <div className="flex flex-col space-y-3">
          {/* <LocationFilter /> */}
          <InputSearchbar />
          <CategoryFilter />
        </div>
        <div className="overflow-y-auto custom-scrollbar mt-5">
          <MosqueList />
        </div>
      </div>
      <Map />
    </div>
  );
}
