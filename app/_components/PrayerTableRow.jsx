"use client";
import { FaPen, FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  showConfirmDelete,
  showForm,
} from "../GlobalRedux/features/modal/modalSlice";
import { setSelectedPrayer } from "../GlobalRedux/features/prayer/prayerSlice";

const PrayerTableRow = ({ prayer, user }) => {
  const { data: session } = useSession();
  const { _id, title, adhaanTime, iqaamaTime, imamName } = prayer;

  const dispatch = useDispatch();

  const openEditForm = () => {
    dispatch(setSelectedPrayer(prayer));
    dispatch(showForm());
  };

  const openPrayerDeleteConfirm = () => {
    dispatch(setSelectedPrayer(prayer));
    dispatch(showConfirmDelete());
  };
  return (
    <tr className="w-full border-2 text-black hover:bg-slate-500 hover:text-white fast-transition">
      <td>{title}</td>
      <td>{adhaanTime}</td>
      <td>{iqaamaTime}</td>
      <td>{imamName}</td>
      {/* show action edit and delete buttons for admins only */}
      {session?.user.email === user.email ? (
        <>
          <td className="group relative">
            <FaPen className="cursor-pointer" onClick={openEditForm} />
            <span className="hover-message">edit {title}</span>
          </td>
          <td className="group relative">
            <FaTrash
              className="cursor-pointer"
              onClick={openPrayerDeleteConfirm}
            />
            <span className="hover-message">delete {title}</span>
          </td>
        </>
      ) : null}
    </tr>
  );
};

export default PrayerTableRow;
