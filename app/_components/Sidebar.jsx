"use client";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../GlobalRedux/features/modal/modalSlice";
import { useSession } from "next-auth/react";
import { styles } from "../styles";
import Link from "next/link";

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
      <FaTimes
        className="text-white absolute z-20 top-2 right-2 text-3xl"
        onClick={() => dispatch(closeModal())}
      />
      <div
        className={`${styles.gradientCyanBlueAmber} p-5 w-4/5 h-full text-white bg-opacity-100 overflow-y-auto flex flex-col justify-start gap-10`}>
        <h2 className="text-center text-xl font-semibold lg:font-bold text-slate-100 border-slate-400 border-b-4 pb-2">
          Hi, {session?.user?.email}
        </h2>

        <ul className="list-none p-0 place-self-start flex-1">
          <li>
            <Link
              href={"/dashboard"}
              className="hover:ml-5 transition-all duration-150 hover:border-b-2 pb-2">
              Dashboard
            </Link>
          </li>
        </ul>
        <div className="flex justify-around gap-4 items-center w-full justify-self-end">
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
