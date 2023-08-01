"use client";
import React, { useState, useEffect, useMemo } from "react";
import { getFavoriteVerse } from "../utils/api";
import { getRandomVerse } from "../utils/randomNumber";

import AudioPlayer from "./AudioPlayer";

const Verse = () => {
  const [fovorite, setFavorite] = useState(null);
  const [fetchError, setFetchError] = useState("");
  const randomNumber = getRandomVerse();
  const [randomVerseNumber, setRandomVerseNumber] = useState(randomNumber);
  const [verse, setVerse] = useState({
    dataEnglish: {},
    dataArabic: {},
  });

  const [loading, setLoading] = useState(true);

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
  }, []);

  const refresh = () => {
    setRandomVerseNumber(getRandomVerse());
  };

  useEffect(() => {
    getData();
  }, [refresh, getNextVerse, getPreviousVerse]);

  useEffect(() => {
    const data = getFavoriteVerse(randomVerseNumber);
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
      </div>

      <AudioPlayer
        src={verse.dataArabic.audio}
        getNextVerse={getNextVerse}
        getPreviousVerse={getPreviousVerse}
        refresh={refresh}
      />
    </div>
  );
};

export default Verse;
