import { Righteous, Poppins } from "next/font/google";
import SearchBar from "./_components/SearchBar";
import MosqueList from "./_components/MosqueList";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  return (
    <div
      className={`${poppins.className} flex min-h-screen flex-col items-center justify-start gap-5 `}>
      <h4
        className={`${righteous.className} text-xl md:text-3xl text-center font-bold mt-5`}>
        Search for mosques, islamic events, Jum'ah and eid prayers and many more
      </h4>
      <SearchBar />

      <MosqueList />
    </div>
  );
}
