"use client";
import { FaSpinner } from "react-icons/fa";
import { styles } from "../styles";

const SubmitButton = ({ isLoading }) => {
  return (
    <button
      type="submit"
      className={`${styles.buttonFluidPlain} bg-purple-600 flex gap-2 items-center justify-center w-full`}
      disabled={isLoading}>
      {isLoading ? (
        <FaSpinner className={`${isLoading ? "animate-spin" : ""}`} />
      ) : (
        <span>Submit</span>
      )}
    </button>
  );
};

export default SubmitButton;
