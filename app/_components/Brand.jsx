import Link from "next/link";
import { Righteous } from "next/font/google";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });

const Brand = () => {
  return (
    <Link href={"/"} className="w-fit">
      <div className="text-center text-white ">
        <h1
          className={`${righteous.className} border-2 rounded-md font-medium text-sm text-white lg:font-semibold lg:text-lg px-0 `}>
          MAM
        </h1>
        <p className="text-xs">Mosquearoundme</p>
      </div>
    </Link>
  );
};

export default Brand;
