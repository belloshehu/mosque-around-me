import React from "react";
import { FaSpinner } from "react-icons/fa";
import { styles } from "../styles";

const SubmitButton = ({ isLoading }) => {
  return (
    <button
      type="submit"
      className={`${styles.buttonFluid} flex gap-2 items-center justify-center w-full`}
      disabled={isLoading}>
      Submit
      {isLoading && (
        <FaSpinner className={`${isLoading ? "animate-spin" : ""}`} />
      )}
    </button>
  );
};

export default SubmitButton;
