"use client";
import Link from "next/link";
import { Righteous } from "next/font/google";
import { styles } from "../styles";
import Brand from "./Brand";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });

const Header = () => {
  return (
    <header className="w-full p-2 px-5 md:p-20 md:py-3 flex justify-between items-center bg-gradient-to-r from-yellow-900 via-purple-700 to-cyan-800">
      <Brand />
      {/* nave links */}
      {/* <nav className="list-none md:flex gap-5 items-center hidden md:visible">
        {links.map((link) => (
          <NaveLink {...link} key={link.path} />
        ))}
      </nav> */}

      {/* auth buttons */}
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
