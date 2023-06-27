"use client";
import React from "react";
import Brand from "./Brand";
import Link from "next/link";
import { styles } from "../styles";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-start gap-5 md:gap-10  bg-gradient-to-r from-yellow-900 via-purple-700 to-cyan-800 text-white p-5 md:p-24 justify-self-end">
      <div className="text-center">
        <Brand />
      </div>
      <div className="text-sm">
        <h3 className="text-lg font-semibold mb-2 text-slate-400">About us</h3>
        <ul className="list-none">
          <li className={styles.underlinedLink}>
            <Link href="/team">Our Team</Link>
          </li>
          <li className={styles.underlinedLink}>
            <Link href="/services">Services</Link>
          </li>
          <li className={styles.underlinedLink}>
            <Link href="/activities">Activites</Link>
          </li>
        </ul>
      </div>
      <div className="text-sm flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-slate-400">Donation</h3>
        <p>Kindly donate to support our efforts</p>
        <Link
          href="/donation"
          className="bg-slate-200 p-2 px-4 text-purple-950">
          Donate
        </Link>
      </div>
      <div className="text-sm flex flex-col gap-2">
        <ul className="list-none">
          <h3 className="text-lg font-semibold text-slate-400 mb-2">Contact</h3>
          <p>For suggestions, complains, inquiry etc. </p>
          <li className={styles.underlinedLink}>
            <Link href="/activities">mosquearoundme@gmail.com</Link>
          </li>
          <li className={styles.underlinedLink}>+2349061983150</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
