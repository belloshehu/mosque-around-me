"use client";
import { Righteous, Poppins } from "next/font/google";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const H3Title = ({ text }) => {
  return (
    <h3
      className={`${poppins.className} font-bold text-purple-600 text-3xl border-b-4 pb-2 w-4/5 md:w-2/5`}>
      {text}
    </h3>
  );
};

export default H3Title;
