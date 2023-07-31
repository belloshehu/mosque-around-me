"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getFavoriteVerse } from "../utils/api";
import FavoriteButton from "./FavoriteButton";
import { useAddFavorite } from "../utils/customHooks";

const Verse = ({ refresh, verseNumber }) => {
  const [fovorite, setFavorite] = useState(null);
  const [fetchError, setFetchError] = useState("");
  const [verse, setVerse] = useState({
    dataEnglish: {},
    dataArabic: {},
  });

  const [loading, setLoading] = useState(true);
  const [addFavorite, isAdding] = useAddFavorite("", {});

  const getData = useMemo(() => {
    return async () => {
      // return data for a verse in Arabic and English

      const randomVerse = verseNumber;
      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/ayah/${randomVerse}/en.asad`
        );
        const dataEnglish = await response.json();

        const response2 = await fetch(
          `https://api.alquran.cloud/v1/ayah/${randomVerse}/ar.alafasy`
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

      // console.log(dataAudio.data)
    };
  }, [verseNumber]);

  useEffect(() => {
    getData();
  }, [refresh]);

  useEffect(() => {
    const data = getFavoriteVerse(verseNumber);
    setFavorite(data);
  }, []);

  if (loading) {
    return <div className="p-2 text-center text-white">loading verse...</div>;
  }
  if (fetchError) {
    return <div className="p-2 text-center text-slate-100">{fetchError}</div>;
  }
  return (
    <div className="relative text-white p-5 my-2 text-center rounded-md shadow-md transition-all duration-200 ">
      <p className="mb-2 text-3xl">{verse.dataArabic?.text}</p>
      <p>{verse.dataEnglish.text}</p>
      <div className="relative mt-2 p-1 text-slate-500 rounded-sm w-fit px-5 m-auto ">
        <small>
          -- {verse.dataEnglish?.surah?.englishName} : verse{" "}
          {verse.dataEnglish?.numberInSurah} --
        </small>
        {/* favorite section */}
      </div>
      <div className="m-auto mt-5 w-full">
        <audio controls autoPlay className="mx-auto rounded-full">
          <source src={verse.dataArabic.audio} type="audio/mpeg" />
        </audio>
      </div>
      <FavoriteButton addToFavorites={addFavorite} style={""} />
    </div>
  );
};

export default Verse;
