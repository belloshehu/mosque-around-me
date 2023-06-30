"use client";
import Link from "next/link";
import { styles } from "../styles";
import Brand from "./Brand";
import { useSession } from "next-auth/react";
import { CiMenuFries } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  toggleDropdown,
} from "../GlobalRedux/features/modal/modalSlice";
import avatarImage from "../_images/avatar.jpg";
import Image from "next/image";
import Dropdown from "./Dropdown";
import NavLinkList from "./NavLinkList";

const Header = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { dropDownOpen } = useSelector((store) => store.modal);
  return (
    <header
      className={` w-full p-2 px-5 md:p-20 md:py-3 flex justify-between items-center bg-gradient-to-r from-yellow-900 via-purple-700 to-cyan-800`}>
      <Brand />
      <NavLinkList />
      {/* nav link to become mosque administrator */}
      <div className="flex gap-2 p-0 items-center">
        <Link
          href={"/admin/mosque"}
          className={`${styles.button} hidden lg:inline lg:visible`}>
          Become an admin
        </Link>

        {session ? (
          <div className="relative hidden lg:inline-flex lg:visible items-center gap-2 text-white">
            <Image
              src={avatarImage}
              placeholder="empty"
              className="hidden lg:inline lg:visible w-10 h-10 rounded-full ring-4 ring-purple-950"
            />
            <small className="text-xm">
              {session?.user.name || "Welcome back"}
            </small>
            {dropDownOpen ? (
              <FaChevronUp
                className="text-3xl cursor-pointer transition-all duration-150"
                onClick={() => dispatch(toggleDropdown())}
              />
            ) : (
              <FaChevronDown
                className="text-3xl cursor-pointer transition-all duration-150"
                onClick={() => dispatch(toggleDropdown())}
              />
            )}

            {dropDownOpen && <Dropdown />}
          </div>
        ) : (
          <Link
            href={"/auth/login"}
            className={`${styles.buttonFluidPlain} hidden lg:inline lg:visible mr-2 border-2 py-2 hover:text-slate-300 text-slate-100`}>
            login
          </Link>
        )}
        <CiMenuFries
          className="visible inline lg:hidden text-white text-5xl cursor-pointer align-top"
          onClick={() => dispatch(openModal())}
        />
      </div>
    </header>
  );
};

export default Header;
