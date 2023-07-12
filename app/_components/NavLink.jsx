import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ linkText, path }) => {
  const pathName = usePathname();
  const arr = pathName.split("/");
  const currentPath = arr[arr.length - 1]; // the current path,  e.g: repos

  return (
    <li>
      <Link
        href={path}
        className={`hover:border-b-4 pb-3 border-white transition-slow ${
          linkText.toLowerCase() === currentPath.toLowerCase()
            ? "border-b-4 border-white"
            : ""
        }`}>
        {linkText}
      </Link>
    </li>
  );
};

export default NavLink;
