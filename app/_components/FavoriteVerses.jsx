"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const FavoriteVerses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verses, setVerses] = useState([]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/favorites/verse");
      setVerses(data.favoriteVerses);
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading verses....</div>;
  }
  if (verses?.length === 0) {
    return (
      <section className="text-center w-full my-5 lg:my-10">
        <p className="text-center">No favorite verses</p>
      </section>
    );
  }
  return (
    <section className="w-full">
      {verses?.map((verse) => (
        <div className="rounded-md border-2 w-full p-2">
          <p>Surah {verse.surah}(verse.verseNumber)</p>
        </div>
      ))}
    </section>
  );
};

export default FavoriteVerses;
