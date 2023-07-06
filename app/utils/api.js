import axios from "axios";

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
