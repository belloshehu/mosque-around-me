"use client";
import { signOut, useSession } from "next-auth/react";
import { styles } from "../styles";
import { links, userLinks } from "../data";
import DropdownLink from "./DropdownLink";
import { Poppins } from "next/font/google";
import { toggleDropdown } from "../GlobalRedux/features/modal/modalSlice";

const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400", "700"] });
const Dropdown = () => {
  const { data: session } = useSession();
  return (
    <div
      className={`${poppins.className} absolute z-20 top-16 right-0 w-fit h-fit px border-md text-black bg-slate-200 text-xs transition-all duration-150`}>
      <header className="bg-cyan-800 p-5 py-2 text-white flex gap-2 w-full">
        <small className="w-full p-0">
          {session?.user.name || session?.user.email}
        </small>
      </header>

      <ul className="list-none my-2 flex flex-col gap-5 p-5">
        {userLinks.map((link) => (
          <DropdownLink
            key={link.path}
            {...link}
            closeModalDropdown={toggleDropdown}
          />
        ))}
      </ul>
      <div className="px-5">
        <button
          onClick={() => signOut()}
          className={`${styles.buttonFluid} w-full border-2 `}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
