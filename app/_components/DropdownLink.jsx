"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggleDropdown } from "../GlobalRedux/features/modal/modalSlice";

const DropdownLink = ({ linkText, path }) => {
  const pathName = usePathname();
  const arr = pathName.split("/");
  const currentPath = arr[arr.length - 1]; // the current path,  e.g: repos
  const dispatch = useDispatch();

  return (
    <li>
      <Link
        href={path}
        onClick={() => dispatch(toggleDropdown())}
        className={` hover:underline ${
          linkText.toLowerCase() === currentPath.toLowerCase()
            ? "border-b-4 border-white"
            : ""
        }`}>
        {linkText}
      </Link>
    </li>
  );
};

export default DropdownLink;
