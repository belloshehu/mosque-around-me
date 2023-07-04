import axios from "axios";

export const getMosques = async () => {
  let response = null;
  try {
    const { data } = await axios.get("/api/mosque", {
      next: {
        revalidate: 60, // refetch every 1 hour
      },
    });
    response = await data.mosques;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return response;
};
