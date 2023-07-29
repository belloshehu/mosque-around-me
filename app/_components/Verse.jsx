"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { getFavoriteVerse } from "../utils/api";
import FavoriteButton from "./FavoriteButton";

const Verse = ({ refresh, verseNumber }) => {
  const [isAddingFavorite, setIsAddingFavorite] = useState(false);
  const [fovorite, setFavorite] = useState(null);
  const [fetchError, setFetchError] = useState("");
  const [verse, setVerse] = useState({
    dataEnglish: {},
    dataArabic: {},
  });

  const [loading, setLoading] = useState(true);

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
  }, [addToFavorites]);

  if (loading) {
    return <div className="p-2 text-center text-white">loading verse...</div>;
  }
  if (fetchError) {
    return <div className="p-2 text-center text-slate-100">{fetchError}</div>;
  }
  return (
    <div className="bg-slate-200 p-2 my-2 text-center rounded-md shadow-md transition-all duration-200 ">
      {/* <div className='mx-auto my-2'>
                <audio controls autoPlay>
                    <source src={verse.dataArabic.audio} type='audio/mpeg' />
                </audio>
            </div> */}
      <p className="mb-2 text-3xl">{verse.dataArabic?.text}</p>
      <p>{verse.dataEnglish.text}</p>
      <div className="relative bg-indigo-300 p-2 rounded-sm w-1/2 m-auto">
        <strong>
          {verse.dataEnglish?.surah?.englishName} -{" "}
          {verse.dataEnglish?.numberInSurah}
        </strong>
        {/* favorite section */}
        <FavoriteButton
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          isFavorite={true}
        />
      </div>
    </div>
  );
};

export default Verse;
