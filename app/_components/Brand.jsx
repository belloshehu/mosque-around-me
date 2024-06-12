import Link from "next/link";
import { Righteous } from "next/font/google";
import Image from "next/image";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });

const Brand = ({ textColor = "text-primary" }) => {
  return (
    <Link href={"/"} className="w-fit p-0 m-0 text-primary flex gap-0 flex-col">
      <Image
        src={"/logo.png"}
        alt="logo"
        height={50}
        width={100}
        className="w-22 h-12 m-0"
      />
      <strong className="text-xs m-0 p-0 ">MosqueConnect</strong>
    </Link>
  );
};

export default Brand;
