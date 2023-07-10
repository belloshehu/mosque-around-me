import axios from "axios";
import { toast } from "react-hot-toast";
export const hasSubscribed = (subscriptions, userId) => {
  //   console.log(subscriptions, userId);

  return (
    subscriptions.filter((subscription) => subscription.user === userId)
      .length > 0
  );
};

export const subscribe = async (mosqueId, serviceName, serviceId) => {
  // handle subscription for a prayer or program with a given ID
  // serviceName takes 'prayer' or 'program' as value
  axios
    .post(
      `http://localhost:3000/api/subscription/${mosqueId}/${serviceName}/${serviceId}`
    )
    .then(() => {
      toast.success("subscribed successfully");
    })
    .catch((error) => {
      toast.error(error.response.data || "Subscription failed");
    });
};
