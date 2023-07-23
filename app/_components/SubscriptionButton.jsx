import { FaBell, FaUsers } from "react-icons/fa";

const SubscriptionButton = ({ subscriptionHandler, subscriptionCount }) => {
  return (
    <button onClick={subscriptionHandler} className="flex gap-4 items-center">
      <div className="flex items-center gap-1 text-primary">
        {subscriptionCount} <FaUsers />
      </div>
      <div className="flex items-center gap-2 bg-purple-300 text-slate-100 px-2 text-sm rounded-full">
        <FaBell className="text-white" />
        subscribe
      </div>
    </button>
  );
};

export default SubscriptionButton;
