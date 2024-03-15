"use client";
import { menuitems } from "../data";
import MenubarItem from "./MenubarItem";
import { Inter, Righteous, Poppins } from "next/font/google";
import UserMenuItem from "./UserMenuItem";
import Link from "next/link";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../GlobalRedux/features/modal/modalSlice";
import Brand from "./Brand";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "700"] });

const SideMenubar = () => {
  const dispatch = useDispatch();
  const { isOpened } = useSelector((store) => store.modal);
  const closeModalHandler = () => {
    dispatch(closeModal());
  };
  return (
    <aside
      className={`${poppins.className} ${
        isOpened ? "translate-x-0" : "-translate-x-[100%] md:translate-x-0"
      } flex flex-col items-start space-y-4 md:space-y-8 md:shadow-md p-5 h-screen bg-black transition-all duration-200 fixed  md:bg-white md:sticky top-0 w-4/6  md:w-[270px] z-20 pr-4`}>
      <LiaTimesSolid
        className="visible inline md:hidden text-purple-600 absolute z-20 top-2 right-2 text-3xl"
        onClick={closeModalHandler}
      />
      {/* <div className="border-b-8 mb-0 border-purple-400 bg-purple-950 text-white text-lg font-bold p-2 px-4 shadow-xl rounded-md mx-4">
        <Link href={"/"}>
          <h2 className={righteous.className}>
            M<span className="text-2xl">A</span>M
          </h2>
        </Link>
      </div> */}
      <Brand />
      <ul className="list-none m-0 p-0 flex flex-col items-start space-y-2 h-full">
        {menuitems.map((item) => (
          <MenubarItem key={item.id} {...item} />
        ))}
      </ul>
      <UserMenuItem />
    </aside>
  );
};

export default SideMenubar;
