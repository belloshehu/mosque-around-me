import axios from "axios";
import { toast } from "react-hot-toast";

export const getMosques = async () => {
  let response = null;
  try {
    const { data } = await axios.get("http://localhost:3000/api/mosque");
    response = await data.mosques;
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const getFavoriteVerse = async ({ verseNumber }) => {
  let response = null;
  try {
    const { data } = await axios.get(`/api/verse/${verseNumber}`);
    response = await data.favoirte;
  } catch (error) {
    console.log(error);
  }
  return response;
};
