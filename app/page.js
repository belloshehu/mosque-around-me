import { Righteous, Poppins } from "next/font/google";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  return (
    <main
      className={`${poppins.className} flex min-h-screen flex-col items-center justify-between p-5 lg:-24`}>
      <p className="text-center">
        Search for mosques, islamic evenets, Jum'ah and eid prayers and many
        more
      </p>
    </main>
  );
}
