"use client";
import Link from "next/link";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { closeModal } from "../GlobalRedux/features/modal/modalSlice";
import { useDispatch } from "react-redux";

const UserMenuItem = () => {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  const { data: session } = useSession();
  return (
    <ul className="flex flex-col items-center place-self-end mx-auto list-none gap-1">
      <li className={`text-sm px-5 text-black flex gap-2 items-center`}>
        {session?.user?.image ? (
          <Image
            src={session?.user?.image}
            className="h-10 w-10 rounded-full ring-2"
          />
        ) : (
          <div className="h-10 w-10 ring-2 ring-purple-600 bg-purple-900 rounded-full flex items-center justify-center">
            <h3 className="text-center text-xl font-bold text-purple-500">
              {session?.user?.firstName.slice(0, 1)}
              {session?.user?.otherName.slice(0, 1).toUpperCase()}
            </h3>
          </div>
        )}
        <small>
          {session?.user?.firstName} {session?.user?.otherName}
        </small>
      </li>
      <li className="text-purple-600 rounded-md p-4 flex gap-2 items-center">
        {session?.user ? (
          <>
            <AiOutlineLogout className="text-xl" />
            <button onClick={() => signOut()} className="text-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <AiOutlineLogin className="text-xl" />
            <Link href={"/auth/login"} className="text-sm">
              Login
            </Link>
          </>
        )}
      </li>
      <li className={`rounded-full bg-purple-600 text-sm p-2 px-5 text-white`}>
        <Link href={"/admin/application"} onClick={closeModalHandler}>
          Become admin
        </Link>
      </li>
    </ul>
  );
};

export default UserMenuItem;
