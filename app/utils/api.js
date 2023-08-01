import axios from "axios";
import { toast } from "react-hot-toast";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://mosque-around-me.vercel.app";
export const getMosques = async () => {
  let response = null;
  try {
    const { data } = await axios.get(`/api/mosque`);
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
