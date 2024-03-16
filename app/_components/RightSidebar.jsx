"use client";
import { menuitems } from "../data";
import MenubarItem from "./MenubarItem";
import { Inter, Righteous, Poppins } from "next/font/google";
import UserMenuItem from "./UserMenuItem";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../GlobalRedux/features/modal/modalSlice";
import Brand from "./Brand";

const poppins = Poppins({ subsets: ["latin"], weight: ["200", "700"] });

const RightSidebar = ({ children }) => {
  return (
    <aside
      className={`${poppins.className} hidden md:flex md:flex-col items-center space-y-4 md:space-y-8 p-5 h-screen fixed md:bg-slate-100 md:sticky top-0  w-1/3 z-20`}>
      {children}
    </aside>
  );
};

export default RightSidebar;
