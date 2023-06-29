import { links } from "../data";
import NavLink from "./NavLink";

const NavLinkList = () => {
  return (
    <ul className=" hidden lg:inline-flex lg:visible list-none gap-5 text-white">
      {links.map((link) => (
        <NavLink key={link.path} {...link} />
      ))}
    </ul>
  );
};

export default NavLinkList;
