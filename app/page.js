"use client";
import { Poppins } from "next/font/google";
import InputSearchbar from "./_components/InputSearchbar";
import MosqueList from "./_components/MosqueList";

import Map from "./_components/Map";
import CategoryFilter from "./_components/CategoryFilter";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "700"] });

export default function Home() {
  return (
    <div
      className={`${poppins.className}  grid grid-cols-1 md:grid-cols-3 w-full gap-4 overflow-x-hidden overflow-y-auto`}>
      <div className="w-full col-span-2">
        <div className="flex flex-col space-y-3">
          {/* <LocationFilter /> */}
          <InputSearchbar />
          <CategoryFilter />
        </div>
        <div className="overflow-y-auto custom-scrollbar mt-5 py-5">
          <MosqueList />
        </div>
      </div>
      <Map />
    </div>
  );
}
