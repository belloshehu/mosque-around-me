"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../styles";
import { hideConfirmDelete } from "../GlobalRedux/features/modal/modalSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

const ConfirmDelete = ({ children, title }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { selectedPrayer } = useSelector((Store) => Store.prayer);

  const deletePrayer = () => {
    setIsLoading(true);
    axios
      .delete(`/api/prayer/${selectedPrayer._id}`)
      .then(() => {
        toast.success("Prayer deleted successfully");
      })
      .catch((error) => {
        toast.error(error.response.data || "Something went wrong");
      });
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col gap-2 items-center justify-center border-2 bg-white p-2 w-full lg:w-1/3 lg:p-10 rounded-md">
      <h3 className="text-xl lg:text-2xl text-center">{title}</h3>
      {children}
      <div className="flex flex-col gap-3 items-center justify-center text-center mt-3">
        <p>Want to delete this item ?</p>
        <div className="flex justify-between gap-5 items-center w-full text-center">
          <button
            className={`${styles.buttonFluidPlain} bg-purple-950 w-full`}
            onClick={deletePrayer}
            disabled={isLoading}>
            Yes
          </button>
          <button
            className={`${styles.buttonFluidPlain} bg-red-900 w-full`}
            onClick={() => dispatch(hideConfirmDelete())}
            disabled={isLoading}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
