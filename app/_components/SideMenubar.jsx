"use client";
import { menuitems } from "../data";
import MenubarItem from "./MenubarItem";
import UserMenuItem from "./UserMenuItem";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../GlobalRedux/features/modal/modalSlice";
import Brand from "./Brand";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { cn } from "../utils/api";

const SideMenubar = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { isOpened } = useSelector((store) => store.modal);
  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  useEffect(() => {}, [session]);
  return (
    <aside
      className={cn(
        "flex flex-col items-start self-start space-y-4 md:space-y-5 md:shadow-md px-5 pb-5 h-screen bg-black transition-all duration-200 fixed  md:bg-white md:sticky top-0 w-4/6  md:w-[270px] z-20 pr-4 -translate-x-[100%] md:translate-x-0",
        { "translate-x-0": isOpened }
      )}>
      <LiaTimesSolid
        className="visible inline md:hidden text-primary absolute z-20 top-2 right-2 text-3xl"
        onClick={closeModalHandler}
      />
      <Brand />
      <ul className="list-none m-0 p-0 flex flex-col items-start space-y-1 h-full">
        {menuitems.map((item) => {
          if (item.text === "Admins" && session?.user?.role !== "staff") {
            return null;
          } else {
            return <MenubarItem key={item.id} {...item} />;
          }
        })}
      </ul>
      <UserMenuItem />
    </aside>
  );
};

export default SideMenubar;
