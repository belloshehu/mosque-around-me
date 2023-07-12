import { FaBell, FaUsers } from "react-icons/fa";

const SubscriptionButton = ({ subscriptionHandler, subscriptionCount }) => {
  return (
    <button onClick={subscriptionHandler} className="flex gap-4 items-center">
      <div className="flex items-center gap-1 text-primary">
        {subscriptionCount} <FaUsers />
      </div>
      <div className="flex items-center gap-2 bg-slate-400 text-white px-2 rounded-full">
        <FaBell className="" />
        subscribe
      </div>
    </button>
  );
};

export default SubscriptionButton;
