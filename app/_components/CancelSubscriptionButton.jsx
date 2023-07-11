import { FaBellSlash } from "react-icons/fa";

const CancelSubscriptionButton = ({ cancelSubscriptionHandler }) => {
  return (
    <button
      onClick={cancelSubscriptionHandler}
      className="flex gap-1 items-center">
      <FaBellSlash className="text-primary" />
      unsubscribe
    </button>
  );
};

export default CancelSubscriptionButton;
