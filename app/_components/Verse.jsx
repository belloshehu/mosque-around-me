"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getFavoriteVerse } from "../utils/api";

const Verse = ({ refresh, verseNumber }) => {
  const [isAddingFavorite, setIsAddingFavorite] = useState(false);
  const [fovorite, setFavorite] = useState(null);
  const [verse, setVerse] = useState({
    dataEnglish: {},
    dataArabic: {},
  });

  const [loading, setLoading] = useState(true);

  const addToFavorites = async () => {
    setIsAddingFavorite(true);
    try {
      const res = await axios.post("/api/verse", {
        verseNumber: verse.dataEnglish.surah.englishName,
        surah: verse.dataEnglish.numberInSurah,
      });
      toast.success(res.data.message);
      setFavorite(true);
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setIsAddingFavorite(false);
    }
  };

  const getData = async () => {
    // return data for a verse in Arabic and English

    const randomVerse = verseNumber;
    const response = await fetch(
      `https://api.alquran.cloud/v1/ayah/${randomVerse}/en.asad`
    );
    const dataEnglish = await response.json();

    const response2 = await fetch(
      `https://api.alquran.cloud/v1/ayah/${randomVerse}/ar.alafasy`
    );
    const dataArabic = await response2.json();

    // console.log(dataAudio.data)

    setVerse({
      ...verse,
      dataArabic: dataArabic.data,
      dataEnglish: dataEnglish.data,
    });
    setLoading(false);
  };

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
        <div className="absolute -bottom-8 md:-bottom-12 right-0 p-2 hover:bg-purple-900 group rounded-md">
          <AiOutlineHeart
            onClick={addToFavorites}
            className="relative text-2xl md:text-3xl text-purple-900 hover:scale-105 fast-transition group-hover:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Verse;
