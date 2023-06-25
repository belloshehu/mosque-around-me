"use client";
import Link from "next/link";
import { Righteous } from "next/font/google";
import { styles } from "../styles";
import Brand from "./Brand";
import { useSession, signOut } from "next-auth/react";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });

const Header = () => {
  const { data } = useSession();
  console.log(data?.user);
  return (
    <header className="w-full p-2 px-5 md:p-20 md:py-3 flex justify-between items-center bg-gradient-to-r from-yellow-900 via-purple-700 to-cyan-800">
      <Brand />

      {data?.user ? (
        <div className="text-white flex gap-2 items-center">
          <p>Hi, {data.user.email} </p>
          <button onClick={() => signOut()} className="border-b-2 ">
            Logout
          </button>
        </div>
      ) : (
        <Link href={"/auth/login"} className="border-2 p-2 px-4 rounded-md">
          Login
        </Link>
      )}

      {/* nav link to become mosque administrator */}
      <ul className="flex gap-2 items-center list-none">
        <Link href={"/admin/mosque"} className={styles.button}>
          Become an admin
        </Link>
      </ul>

      {/* <button className={styles.button}>login</button>
        <button className={styles.button}>signup</button> */}
    </header>
  );
};

export default Header;
