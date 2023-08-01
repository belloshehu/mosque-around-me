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
  return axios
    .post(`/api/subscription/${mosqueId}/${serviceName}/${serviceId}`)
    .then(({ data }) => {
      toast.success("subscribed successfully");
      return data;
    })
    .catch((error) => {
      toast.error(error.response.data || "Subscription failed");
    });
};

export const unSubscribe = async (mosqueId, serviceName, serviceId) => {
  // handle subscription for a prayer or program with a given ID
  // serviceName takes 'prayer' or 'program' as value
  return axios
    .patch(`/api/subscription/${mosqueId}/${serviceName}/${serviceId}`)
    .then(({ data }) => {
      toast.success("Unsubscribed successfully");
      return data;
    })
    .catch((error) => {
      toast.error(error.response.data || "Failed to unsubscribe");
    });
};
