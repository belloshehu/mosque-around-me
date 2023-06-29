import { links } from "../data";
import NavLink from "./NavLink";

const NavLinkList = () => {
  return (
    <ul className="list-none gap-5 flex text-white">
      {links.map((link) => (
        <NavLink key={link.path} {...link} />
      ))}
    </ul>
  );
};

export default NavLinkList;
