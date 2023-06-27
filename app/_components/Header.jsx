"use client";
import Link from "next/link";
import { Righteous } from "next/font/google";
import { styles } from "../styles";
import Brand from "./Brand";
import { useSession, signOut } from "next-auth/react";
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openModal } from "../GlobalRedux/features/modal/modalSlice";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });

const Header = () => {
  const { data } = useSession();
  const dispatch = useDispatch();

  return (
    <header className="w-full p-2 px-5 md:p-20 md:py-3 flex justify-between items-center bg-gradient-to-r from-yellow-900 via-purple-700 to-cyan-800">
      <Brand />

      {/* nav link to become mosque administrator */}
      <div className="flex gap-2 p-0 items-center">
        <Link href={"/admin/mosque"} className={styles.button}>
          Become an admin
        </Link>

        <Link
          href={"/auth/login"}
          className={`${styles.buttonFluidPlain} hidden lg:inline lg:visible mr-2 border-2 py-2 hover:text-slate-300 text-slate-100`}>
          login
        </Link>
        <FaBars
          className="visible inline lg:hidden text-white text-5xl cursor-pointer align-top"
          onClick={() => dispatch(openModal())}
        />
      </div>
    </header>
  );
};

export default Header;
