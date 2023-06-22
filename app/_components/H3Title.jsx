"use client";
import { Righteous, Poppins } from "next/font/google";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const H3Title = ({ text }) => {
  return (
    <h3
      className={`${poppins.className} font-bold text-transparent bg-clip-text bg-gradient-radial from-cyan-600 to-yellow-700 text-3xl lg:text-5xl`}>
      {text}
    </h3>
  );
};

export default H3Title;
