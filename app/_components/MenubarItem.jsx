"use client";
import Link from "next/link";
import { closeModal } from "../GlobalRedux/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

const MenubarItem = ({ icon, text, path }) => {
  const pathName = usePathname();
  const arr = pathName.split("/");
  const currentPath = arr[arr.length - 1]; // the current path,  e.g: repos

  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(closeModal());
  };
  return (
    <li className="w-full">
      <Link
        onClick={closeModalHandler}
        href={path}
        className={`${
          text.toLowerCase() === currentPath.toLowerCase()
            ? "bg-purple-200"
            : ""
        } flex items-center group hover:gap-3 gap-0 relative hover:bg-purple-200 hover:scale-[102%] text-xl transition-all duration-150 hover:text-white text-purple-600 rounded-md p-4 py-3 w-full`}>
        <span className="text-3xl">{icon}</span>
        <span className="group-hover:scale-95 group-hover:text-white scale-75 text-purple-400 w-full">
          {text}
        </span>
      </Link>
    </li>
  );
};

export default MenubarItem;
