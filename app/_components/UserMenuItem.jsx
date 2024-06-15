"use client";
import Link from "next/link";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { closeModal } from "../GlobalRedux/features/modal/modalSlice";
import { useDispatch } from "react-redux";

const renderUserAvatar = (session) => {
  if (!session) return null;
  if (session)
    return (
      <div className={`text-sm text-black flex gap-2 items-center`}>
        {session?.user?.image ? (
          <Image
            src={session?.user?.image}
            className="h-10 w-10 rounded-full ring-2"
            width={50}
            height={50}
          />
        ) : (
          <div className="h-10 w-10 ring-2 ring-primary bg-primary rounded-full flex items-center justify-center">
            <h3 className="text-center text-xl font-bold text-white">
              {session?.user?.firstName.slice(0, 1)}
              {session?.user?.otherName.slice(0, 1).toUpperCase()}
            </h3>
          </div>
        )}
      </div>
    );
};

const renderAuthButton = (session) => {
  const closeModalHandler = () => {
    dispatch(closeModal());
  };
  return (
    <div className="text-primary rounded-md inline-flex gap-2 items-center">
      {session?.user ? (
        <>
          <AiOutlineLogout className="text-xl" />
          <button
            onClick={() => {
              signOut();
              closeModalHandler();
            }}
            className="text-sm">
            Logout
          </button>
        </>
      ) : (
        <>
          <AiOutlineLogin className="text-xl" />
          <Link
            href={"/auth/login"}
            className="text-sm"
            onClick={closeModalHandler}>
            Login
          </Link>
        </>
      )}
    </div>
  );
};

const UserMenuItem = () => {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  const { data: session } = useSession();
  return (
    <ul className="flex flex-col items-center mx-auto list-none gap-4 mb-8">
      <li
        className={`rounded-full bg-primary text-white text-sm p-2 px-5 block`}>
        <Link href={"/admin/application"} onClick={closeModalHandler}>
          Become admin
        </Link>
      </li>
      <li className="flex gap-2 items-center">
        {renderUserAvatar(session)} {renderAuthButton(session)}
      </li>
    </ul>
  );
};

export default UserMenuItem;
