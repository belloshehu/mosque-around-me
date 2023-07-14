import { FaBellSlash, FaUsers } from "react-icons/fa";

const CancelSubscriptionButton = ({
  cancelSubscriptionHandler,
  subscriptionCount,
}) => {
  return (
    <button
      onClick={cancelSubscriptionHandler}
      className="flex gap-4 items-center">
      <div className="flex items-center gap-1 text-primary">
        {subscriptionCount} <FaUsers />
      </div>
      <div className="flex items-center gap-2 bg-slate-100 text-black px-2 rounded-full">
        <FaBellSlash className="" />
        unsubscribe
      </div>
    </button>
  );
};

export default CancelSubscriptionButton;
