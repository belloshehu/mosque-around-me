import { menuitems } from "../data";
import MenubarItem from "./MenubarItem";
import { Inter, Righteous } from "next/font/google";

const righteous = Inter({ subsets: ["latin"], weight: ["400"] });
const SideMenubar = () => {
  return (
    <aside className="flex flex-col items-center space-y-8 shadow-md p-5 h-screen sticky top-0 w-[100px] z-20">
      <div className="border-b-4 border-purple-950 text-primary text-xl font-bold">
        <h2 className={righteous.className}>Mam</h2>
      </div>
      <ul className="list-none m-0 p-0 flex flex-col items-center space-y-6">
        {menuitems.map((item) => (
          <MenubarItem key={item.id} icon={item.icon} />
        ))}
      </ul>
    </aside>
  );
};

export default SideMenubar;
