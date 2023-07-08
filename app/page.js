"use client";
import { Righteous, Poppins } from "next/font/google";
import SearchBar from "./_components/SearchBar";
import MosqueList from "./_components/MosqueList";
import { Suspense } from "react";
import { useSelector } from "react-redux";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const { searchResultTitle, mosques } = useSelector((store) => store.mosque);
  return (
    <div
      className={`${poppins.className} flex min-h-screen flex-col items-center justify-start gap-5 overflow-x-hidden `}>
      <h4
        className={`${righteous.className} text-xl md:text-3xl text-center font-bold mt-5 text-transparent bg-clip-text bg-gradient-radial from-cyan-600 to-yellow-700 `}>
        Search for mosques, islamic events, Jum'ah and eid prayers around you
      </h4>
      <SearchBar />
      <Suspense
        fallback={
          <div>
            <span>loading mosques ...</span>
          </div>
        }>
        <div className="mt-5 text-center">
          {searchResultTitle && (
            <h2 className="font-semibold">
              {mosques.length} {searchResultTitle}
            </h2>
          )}
          <MosqueList />
        </div>
      </Suspense>
    </div>
  );
}
