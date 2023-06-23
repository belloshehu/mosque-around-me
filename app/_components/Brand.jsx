import Link from "next/link";
import { Righteous } from "next/font/google";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });

const Brand = () => {
  return (
    <div className="border-2 p-1 rounded-md">
      <Link href={"/"}>
        <h1
          className={`${righteous.className} font-bold text-xl text-white lg:text-3xl `}>
          MAM
        </h1>
      </Link>
    </div>
  );
};

export default Brand;
