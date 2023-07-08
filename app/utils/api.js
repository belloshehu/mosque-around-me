import axios from "axios";
import { toast } from "react-hot-toast";

export const getMosques = async () => {
  let response = null;
  try {
    const { data } = await axios.get("http://localhost:3000/api/mosque");
    response = await data.mosques;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const subscribe = async (serviceName, serviceId) => {
  // handle subscription for a prayer or program with a given ID
  // serviceName takes 'prayer' or 'program' as value
  axios
    .post(`http://localhost:3000/api/subscription/${serviceName}/${serviceId}`)
    .then(() => {
      toast.success("subscribed successfully");
    })
    .catch((error) => {
      toast.error(error.response.data || "Subscription failed");
    });
};
