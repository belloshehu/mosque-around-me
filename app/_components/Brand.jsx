import Link from "next/link";
import { Righteous } from "next/font/google";
import Image from "next/image";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });

const Brand = ({ textColor = "text-primary" }) => {
  return (
    <Link href={"/"} className="w-fit ">
      <div className={`text-center ${textColor}`}>
        <Image src={"/logo.png"} alt="logo" height={70} width={100} />
        <p className="text-xs">MosqueConnect</p>
      </div>
    </Link>
  );
};

export default Brand;
