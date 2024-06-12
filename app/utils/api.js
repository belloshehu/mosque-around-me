import axios from "axios";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://mosqueconnect.org";

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

export const getAPIPayload = async (url) => {
  let response = null;
  try {
    const { data } = await axios.get(`${baseUrl}/${url}`, {
      next: {
        invalidate: 50,
      },
    });
    response = data;
  } catch (error) {
    console.error(error);
  } finally {
    return response;
  }
};

export const getExternalAPIPayload = async (url) => {
  let response = null;
  try {
    const { data } = await axios.get(url, {
      next: {
        invalidate: 50,
      },
    });
    response = data;
  } catch (error) {
    console.error(error);
  } finally {
    return response;
  }
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

export const cn = (...args) => {
  return twMerge(clsx(args));
};
