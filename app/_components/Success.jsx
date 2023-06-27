"use client";
import { styles } from "../styles";
import { Righteous, Poppins } from "next/font/google";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateFormSuccess } from "../GlobalRedux/features/form/formSlice";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

/* COmponent to show success message upon successfull submission */

const Success = ({ titleText, message }) => {
  const dispatch = useDispatch();
  return (
    <div className={`${poppins.className} h-screen w-full flex justify-center`}>
      <div className="w-full p-2 lg:border-2 lg:w-2/5 lg:p-10 flex flex-col justify-center h-fit gap-4 text-center">
        <h2 className="text-xl lg:text-3xl font-semibold lg:font-bold text-green-500">
          {titleText}
        </h2>
        <p>{message}</p>
        <Link
          href="/dashboard "
          onClick={() => dispatch(updateFormSuccess(false))}
          className={`${styles.buttonFluid}`}>
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Success;
