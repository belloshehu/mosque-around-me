"use client";
import { useEffect } from "react";
import {
  FaCaretRight,
  FaClosedCaptioning,
  FaEye,
  FaFlipboard,
  FaPen,
  FaToggleOff,
  FaTrash,
} from "react-icons/fa";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { LiaTimesSolid } from "react-icons/lia";
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

const ProgramListItem = ({ program, user, mosque_id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEditDelete, setShowEditDelete] = useState(false);
  const { data: session } = useSession();
  const {
    _id,
    title,
    description,
    startDate,
    stopDate,
    customDate,
    subscriptions: programSubscriptions,
  } = program;
  const [subscriptions, setSubscriptions] = useState(programSubscriptions);

  const dispatch = useDispatch();

  const openEditForm = () => {
    // dispatch(setSelectedPrayer(prayer));
    dispatch(showForm("prayer"));
    setShowEditDelete(false);
  };

  const openPrayerDeleteConfirm = () => {
    // dispatch(setSelectedPrayer(prayer));
    dispatch(showConfirmDelete());
  };

  const handleSubscription = async () => {
    setIsLoading(true);
    try {
      const { subscription } = await subscribe(mosque_id, "program", _id);
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
      const { subscription } = await unSubscribe(mosque_id, "program", _id);
      // remove instance of subscription from the list of the subscriptions
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

  return (
    <div className="w-full text-black h-full hover:scale-[98%] hover:border-primary relative border-2 fast-transition flex flex-col gap-2 text-center rounded-full">
      <div className="flex justify-around py-4">
        <div className="table-cell">
          <p>{title}</p>
        </div>
        <div className="table-cell ">{startDate || ""}</div>
        <div className="table-cell ">{stopDate || ""}</div>
      </div>

      <div className="w-full flex justify-around py-1 absolute -bottom-8 z-20">
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

export default ProgramListItem;
