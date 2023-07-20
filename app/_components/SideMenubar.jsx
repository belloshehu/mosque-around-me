"use client";
import { menuitems } from "../data";
import MenubarItem from "./MenubarItem";
import { Inter, Righteous } from "next/font/google";
import UserMenuItem from "./UserMenuItem";
import Link from "next/link";

const righteous = Inter({ subsets: ["latin"], weight: ["400"] });
const SideMenubar = () => {
  return (
    <aside className="flex flex-col items-start space-y-8 shadow-md p-5 h-screen sticky top-0 w-[270px] z-20 pr-4">
      <div className="border-b-8 border-purple-400 bg-purple-950 text-white text-lg font-bold p-2 px-4 shadow-xl rounded-md mx-4">
        <Link href={"/"}>
          <h2 className={righteous.className}>
            M<span className="text-2xl">A</span>M
          </h2>
        </Link>
      </div>
      <ul className="list-none m-0 p-0 flex flex-col items-start space-y-4 h-full">
        {menuitems.map((item) => (
          <MenubarItem key={item.id} {...item} />
        ))}
      </ul>
      <UserMenuItem />
    </aside>
  );
};

export default SideMenubar;
