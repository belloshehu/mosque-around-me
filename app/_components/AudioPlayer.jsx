import FavoriteButton from "./FavoriteButton";
import React, { useEffect, useState, useRef } from "react";
import { FcRefresh } from "react-icons/fc";
import { useAddFavorite } from "../utils/customHooks";
import {
  TbPlayerPause,
  TbPlayerPlay,
  TbPlayerTrackNext,
  TbPlayerTrackPrev,
} from "react-icons/tb";

const AudioPlayer = ({ src, getNextVerse, getPreviousVerse, refresh }) => {
  const audioRef = useRef(new Audio(src));
  const [isPlaying, setIsPlaying] = useState(false);
  const [addFavorite, isAdding] = useAddFavorite("", {});

  useEffect(() => {
    audioRef.current.autoplay = true;
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  return (
    <div className="flex gap-10 items-center absolute -bottom-14  md:-bottom-8 left-0 p-4 bg-black border-[1px] border-slate-200 border-transparent">
      <FcRefresh onClick={refresh} className="text-white control-btn" />
      <TbPlayerTrackPrev onClick={getPreviousVerse} className="control-btn" />

      {isPlaying ? (
        <TbPlayerPause
          className="control-btn"
          onClick={() => setIsPlaying(false)}
        />
      ) : (
        <TbPlayerPlay
          className="control-btn"
          onClick={() => setIsPlaying(true)}
        />
      )}
      <TbPlayerTrackNext onClick={getNextVerse} className="control-btn" />

      <FavoriteButton addToFavorites={addFavorite} style={"relative"} />
    </div>
  );
};

export default AudioPlayer;
