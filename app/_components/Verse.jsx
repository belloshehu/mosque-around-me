"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getFavoriteVerse } from "../utils/api";
import FavoriteButton from "./FavoriteButton";
import { useAddFavorite } from "../utils/customHooks";
import { getRandomVerse } from "../utils/randomNumber";
import { FcNext, FcPrevious, FcRefresh } from "react-icons/fc";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

const Verse = ({ verseNumber }) => {
  const [fovorite, setFavorite] = useState(null);
  const [fetchError, setFetchError] = useState("");
  const [randomVerseNumber, setRandomVerseNumber] = useState(verseNumber);
  const [verse, setVerse] = useState({
    dataEnglish: {},
    dataArabic: {},
  });

  const [loading, setLoading] = useState(true);
  const [addFavorite, isAdding] = useAddFavorite("", {});

  const getNextVerse = () => {
    if (randomVerseNumber < 6666) {
      setRandomVerseNumber(randomVerseNumber + 1);
    }
  };

  const getPreviousVerse = () => {
    if (randomVerseNumber > 0) {
      setRandomVerseNumber(randomVerseNumber - 1);
    }
  };
  const getData = useMemo(() => {
    return async () => {
      // return data for a verse in Arabic and English

      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/ayah/${randomVerseNumber}/en.asad`
        );
        const dataEnglish = await response.json();

        const response2 = await fetch(
          `https://api.alquran.cloud/v1/ayah/${randomVerseNumber}/ar.alafasy`
        );
        const dataArabic = await response2.json();
        setVerse({
          ...verse,
          dataArabic: dataArabic.data,
          dataEnglish: dataEnglish.data,
        });
      } catch (error) {
        setFetchError("Failed to fetch verse. Check internet connection");
      } finally {
        setLoading(false);
      }
    };
  }, [randomVerseNumber]);

  const refresh = () => {
    setRandomVerseNumber(getRandomVerse());
  };
  useEffect(() => {
    getData();
  }, [refresh, getNextVerse, getPreviousVerse]);

  useEffect(() => {
    const data = getFavoriteVerse(verseNumber);
    setFavorite(data);
  }, []);

  if (loading) {
    return (
      <div className="p-2 text-center text-white bg-black bg-opacity-90">
        loading verse...
      </div>
    );
  }
  if (fetchError) {
    return (
      <div className="text-center text-slate-100 bg-black bg-opacity-90 p-5">
        {fetchError}
      </div>
    );
  }
  return (
    <div className="relative text-white p-5 my-2 text-center flex flex-col items-center justify-center rounded-md bg-black bg-opacity-90 shadow-md transition-all duration-200 w-full min-h-[50%]">
      <p className="mb-2 text-3xl">{verse.dataArabic?.text}</p>
      <p>{verse.dataEnglish.text}</p>
      <div className="mt-2 p-1 text-slate-500 rounded-sm w-fit px-5 mx-auto ">
        <small>
          -- {verse.dataEnglish?.surah?.englishName} : verse{" "}
          {verse.dataEnglish?.numberInSurah} --
        </small>
        {/* favorite section */}
      </div>
      <div className="mx-auto mt-4 ">
        <audio controls autoPlay className="mx-auto rounded-full">
          <source src={verse.dataArabic.audio} type="audio/mpeg" />
        </audio>
      </div>
      <div className="flex gap-10 items-center text-xl absolute -bottom-4 md:-bottom-8 left-0 p-4 bg-black border-[1px] border-slate-200 border-transparent">
        <FcRefresh onClick={refresh} className="text-white" />
        <TbPlayerTrackPrev onClick={getPreviousVerse} className="" />
        <TbPlayerTrackNext onClick={getNextVerse} className="" />
        <FavoriteButton addToFavorites={addFavorite} style={"relative"} />
      </div>
    </div>
  );
};

export default Verse;
