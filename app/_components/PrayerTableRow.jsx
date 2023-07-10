"use client";
import { useEffect } from "react";
import { FaBell, FaBellSlash, FaPen, FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import {
  showConfirmDelete,
  showForm,
} from "../GlobalRedux/features/modal/modalSlice";
import { setSelectedPrayer } from "../GlobalRedux/features/prayer/prayerSlice";
import { hasSubscribed, subscribe, unSubscribe } from "../utils/subscriptions";
import { useState } from "react";

const PrayerTableRow = ({ prayer, user, mosque_id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { _id, title, adhaanTime, iqaamaTime, imamName, subscriptions } =
    prayer;

  const dispatch = useDispatch();

  const openEditForm = () => {
    dispatch(setSelectedPrayer(prayer));
    dispatch(showForm());
  };

  const openPrayerDeleteConfirm = () => {
    dispatch(setSelectedPrayer(prayer));
    dispatch(showConfirmDelete());
  };

  const handleSubscription = async () => {
    setIsLoading(true);
    try {
      await subscribe(mosque_id, "prayer", _id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    try {
      await unSubscribe(mosque_id, "prayer", _id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr className="w-full border-2 text-black hover:bg-slate-500 hover:text-white fast-transition">
      <td>{title}</td>
      <td>{adhaanTime}</td>
      <td>{iqaamaTime}</td>
      <td>{imamName}</td>
      <td className="group relative">
        {session ? (
          hasSubscribed(subscriptions, session.user._id) ? (
            <button
              onClick={handleCancelSubscription}
              className="flex gap-1 items-center">
              <FaBellSlash className="text-primary" />
              unsubscribe
            </button>
          ) : (
            <button
              onClick={handleSubscription}
              className="flex gap-1 items-center">
              <FaBell className="text-primary" />
              subscribe
            </button>
          )
        ) : (
          <button
            onClick={handleSubscription}
            className="flex gap-1 items-center">
            <FaBell className="text-primary" />
            subscribe
          </button>
        )}
        <span className="hover-message">Subscribe for {title}</span>
      </td>
      {/* show action edit and delete buttons for admins only */}
      {session?.user.email === user.email ? (
        <>
          <td className="group relative">
            <button onClick={openEditForm}>
              <FaPen className="cursor-pointer text-primary" />
            </button>
            <span className="hover-message">edit {title}</span>
          </td>
          <td className="group relative">
            <button onClick={openPrayerDeleteConfirm} disabled={isLoading}>
              <FaTrash className="text-red-900" />
            </button>
            <span className="hover-message">delete {title}</span>
          </td>
        </>
      ) : null}
    </tr>
  );
};

export default PrayerTableRow;
