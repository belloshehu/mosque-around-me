"use client";
import Link from "next/link";
import { links } from "../data";
import NaveLink from "./NaveLink";

import { Righteous } from "next/font/google";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });

const Header = () => {
  return (
    <header className="w-full p-2 px-5 md:p-20 md:py-3 flex justify-between items-center bg-gradient-to-r from-yellow-900 via-purple-700 to-cyan-800">
      <div className="border-2 p-1 rounded-md">
        <Link href={"/"}>
          <h1
            className={`${righteous.className} font-bold text-xl text-white lg:text-3xl `}>
            MAM
          </h1>
        </Link>
      </div>
      <nav className="list-none flex gap-5 items-center">
        {links.map((link) => (
          <NaveLink {...link} key={link.path} />
        ))}
      </nav>
    </header>
  );
};

export default Header;
