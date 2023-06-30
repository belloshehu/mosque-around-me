"use client";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../GlobalRedux/features/modal/modalSlice";
import { useSession, signOut } from "next-auth/react";
import { styles } from "../styles";
import Link from "next/link";
import avatarImage from "../_images/avatar.jpg";
import Image from "next/image";
import { userLinks } from "../data";
import DropdownLink from "./DropdownLink";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isOpened } = useSelector((store) => store.modal);
  const { data: session } = useSession();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };
  return (
    <aside
      className={`${
        isOpened ? "visible" : "hidden"
      } inline w-full h-screen fixed bg-black bg-opacity-70 top-0 left-0 z-10 shadow-[0_35px_60px_1000px_rgba(0,0,0,0.8)] `}>
      <LiaTimesSolid
        className="text-white absolute z-20 top-2 right-2 text-3xl"
        onClick={closeModalHandler}
      />
      <div
        className={`${styles.gradientCyanBlueAmber} p-5 w-4/5 h-full text-white bg-opacity-100 overflow-y-auto flex flex-col justify-start gap-10`}>
        {session?.user && (
          <div className="flex gap-2 items-center">
            <Link href={"/dashboard"}>
              <Image
                src={avatarImage}
                placeholder="empty"
                className="w-10 h-10 rounded-full ring-4 ring-purple-950"
              />
            </Link>
            <h2 className="text-center text-slate-100 border-slate-400 border-b-4 pb-2">
              Hi,
              {session?.user?.firstName ||
                session?.user?.name ||
                session?.user?.email}
            </h2>
          </div>
        )}

        <ul className="list-none my-2 flex flex-col gap-5 p-5 flex-1">
          {userLinks.map((link) => (
            <DropdownLink
              key={link.path}
              {...link}
              closeModalDropdown={closeModal}
            />
          ))}
        </ul>

        {/* <ul className="list-none p-0 place-self-start flex-1">
          {session?.user && (
            <li>
              <Link
                href={"/dashboard"}
                onClick={closeModalHandler}
                className="hover:ml-5 transition-all duration-150 hover:border-b-2 pb-2">
                Dashboard
              </Link>
            </li>
          )}
        </ul> */}
        <div className="flex flex-col  justify-around gap-4 items-center w-full justify-self-end">
          <Link
            href={"/admin/mosque"}
            onClick={closeModalHandler}
            className={styles.button}>
            Become an admin
          </Link>
          {!session?.user ? (
            <>
              <Link
                onClick={closeModalHandler}
                href={"/auth/login"}
                className={`${styles.buttonFluidPlain} w-full border-2 hover:text-slate-300 text-slate-100`}>
                Login
              </Link>
              <Link
                onClick={closeModalHandler}
                href={"/auth/signup"}
                className={`${styles.buttonFluidPlain} w-full border-2 py-2 hover:text-slate-300 text-slate-100`}>
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={() => signOut()}
              className={`${styles.buttonFluidPlain} w-full border-2 py-2 hover:text-slate-300 text-slate-100`}>
              Logout
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
