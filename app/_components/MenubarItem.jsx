"use client";
import Link from "next/link";
import { closeModal } from "../GlobalRedux/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { cn } from "../utils/api";

const MenubarItem = ({ icon, text, path }) => {
  const pathName = usePathname();
  const arr = pathName.split("/");
  const currentPath = arr[arr.length - 1]; // the current path,  e.g: repos

  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(closeModal());
  };
  return (
    <li className="w-full p-0">
      <Link
        onClick={closeModalHandler}
        href={path}
        className={cn(
          "flex items-center group gap-3 relative hover:bg-gray-200  transition-all duration-150 text-purple-600 rounded-md p-4 py-1 md:p-3 w-full",
          {
            "bg-purple-200": text.toLowerCase() === currentPath.toLowerCase(),
          }
        )}>
        <span className="text-2xl">{icon}</span>
        <span className=" text-purple-400 w-full text-sm">{text}</span>
      </Link>
    </li>
  );
};

export default MenubarItem;
