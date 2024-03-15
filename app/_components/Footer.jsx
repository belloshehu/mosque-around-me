"use client";
import React from "react";
import Brand from "./Brand";
import Link from "next/link";
import { styles } from "../styles";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-start gap-10 bg-black text-white p-5 md:p-24 md:pb-10 w-full">
      <div className="flex flex-col md:flex-row justify-start gap-5 md:gap-10  w-full">
        <div className="text-center">
          <Brand textColor="text-white" />
        </div>
        <div className="text-sm gap-2">
          <h3 className="text-lg font-semibold mb-2 text-slate-100">
            About us
          </h3>
          <ul className="list-none flex flex-col gap-3 text-slate-400">
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
          <h3 className="text-lg font-semibold text-slate-100 mb-2">Contact</h3>
          <ul className="list-none flex flex-col gap-3 text-slate-400">
            <p>For suggestions, complains, inquiry etc. </p>
            <li className={styles.underlinedLink}>
              <Link href="/activities">mosqueconnect@gmail.com</Link>
            </li>
            <li className={styles.underlinedLink}>+2349061983150</li>
          </ul>
        </div>
        <div className="text-sm flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-slate-100 mb-2">
            Donation
          </h3>
          <div className="text-sm flex flex-col gap-3 text-slate-400">
            <p>Kindly donate to support our efforts</p>
            <Link
              href="/donation"
              className="bg-slate-200 p-2 px-4 text-purple-950">
              Donate
            </Link>
          </div>
        </div>
        {/* socials */}
        <div className="text-sm flex flex-col gap-2 md:justify-self-end">
          <h3 className="text-lg font-semibold mb-2 text-slate-100">
            Our Social platform
          </h3>
          <ul className="list-none flex flex-col md:flex-row gap-3 text-slate-300">
            <li>
              <Link href={"#"}>
                <FaFacebook className="w-8 h-8 rounded-full" />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <FaInstagram className="w-8 h-8 rounded-full" />
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <FaYoutube className="w-8 h-8 rounded-full" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-sm mt-10">
        <p> @ {new Date().getFullYear()} Mosqueconnect. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
