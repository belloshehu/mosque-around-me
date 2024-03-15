"use client";
import { useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import {
  showConfirmDelete,
  showForm,
} from "../GlobalRedux/features/modal/modalSlice";
import { setSelectedPrayer } from "../GlobalRedux/features/prayer/prayerSlice";
import { hasSubscribed, subscribe, unSubscribe } from "../utils/subscriptions";
import { useState } from "react";
import SubscriptionButton from "./SubscriptionButton";
import CancelSubscriptionButton from "./CancelSubscriptionButton";
import { isDuePrayer } from "../utils/timeConverter";
import { FcAlarmClock } from "react-icons/fc";

const PrayerTableRow = ({ prayer, user, mosque_id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDue, setIsDue] = useState(false);
  const [showEditDelete, setShowEditDelete] = useState(false);
  const { data: session } = useSession();
  const {
    _id,
    title,
    adhaanTime,
    iqaamaTime,
    imamName,
    subscriptions: prayerSubscriptions,
  } = prayer;
  const [subscriptions, setSubscriptions] = useState(prayerSubscriptions);

  const dispatch = useDispatch();

  const openEditForm = () => {
    dispatch(setSelectedPrayer(prayer));
    dispatch(showForm("prayer"));
    setShowEditDelete(false);
  };

  const openPrayerDeleteConfirm = () => {
    dispatch(setSelectedPrayer(prayer));
    dispatch(showConfirmDelete());
  };

  const handleSubscription = async () => {
    setIsLoading(true);
    try {
      const { subscription } = await subscribe(mosque_id, "prayer", _id);
      // add the user subscription instance to the list of the subscriptions
      setSubscriptions((prev) => [...prev, subscription]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    try {
      const { subscription } = await unSubscribe(mosque_id, "prayer", _id);
      // removew instance of subscription from the list of the subscriptions
      setSubscriptions((prev) =>
        prev.filter((item) => item._id !== subscription._id)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, [subscriptions]);
  useEffect(() => {
    let timer = null;
    setInterval(() => {
      setIsDue(isDuePrayer(adhaanTime, iqaamaTime));
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      className={`w-full text-black h-full ${
        isDue ? "bg-slate-300 border-purple-300" : "bg-slate-200"
      } shadow-md hover:scale-[98%] hover:border-primary relative border-2 fast-transition flex flex-col gap-2 text-center rounded-full`}>
      {isDue && (
        <FcAlarmClock className="absolute -top-1 -left-2 animate-ping text-purple-600" />
      )}
      <div className="flex justify-around py-4">
        <div className="table-cell ">{title}</div>
        <div className="table-cell ">{adhaanTime}</div>
        <div className="table-cell">{iqaamaTime}</div>
        {/* <div className="table-cell">{imamName}</div> */}
      </div>

      <div className="w-full flex justify-around py-1 absolute -bottom-9 z-10">
        <div className="group relative flex w-full justify-start">
          {session ? (
            hasSubscribed(subscriptions, session.user._id) ? (
              <CancelSubscriptionButton
                cancelSubscriptionHandler={handleCancelSubscription}
                subscriptionCount={subscriptions.length}
              />
            ) : (
              <SubscriptionButton
                subscriptionCount={subscriptions.length}
                subscriptionHandler={handleSubscription}
              />
            )
          ) : (
            <SubscriptionButton
              subscriptionCount={subscriptions.length}
              subscriptionHandler={handleSubscription}
            />
          )}
          <span className="hover-message">Subscribe for {title}</span>
        </div>
        {/* show action edit and delete buttons for admins only */}
        {session?.user.email === user.email && showEditDelete ? (
          <div className="absolute flex justify-around items-center bg-slate-200 h-full top-0 left-0 w-full z-20 slow-transition">
            <div className="group relative">
              <button onClick={openEditForm}>
                <FaPen className=" text-primary text-2xl" />
              </button>
              <span className="hover-message">edit {title}</span>
            </div>
            <div className="group relative">
              <button onClick={openPrayerDeleteConfirm} disabled={isLoading}>
                <FaTrash className="text-red-900 text-2xl" />
              </button>
              <span className="hover-message">delete {title}</span>
            </div>
          </div>
        ) : null}
        {session?.user.email === user.email &&
          (!showEditDelete ? (
            <button
              className="p-2 text-primary text-sm absolute -top-14 right-2"
              onClick={() => setShowEditDelete(true)}>
              <BsChevronDown />
            </button>
          ) : (
            <button
              className="p-2 text-primary text-sm absolute -top-14 right-2"
              onClick={() => setShowEditDelete(false)}>
              <BsChevronUp />
            </button>
          ))}
      </div>
    </div>
  );
};

export default PrayerTableRow;
