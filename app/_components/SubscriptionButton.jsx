import { FaBell } from "react-icons/fa";

const SubscriptionButton = ({ subscriptionHandler }) => {
  return (
    <button onClick={subscriptionHandler} className="flex gap-1 items-center">
      <FaBell className="text-primary" />
      subscribe
    </button>
  );
};

export default SubscriptionButton;
