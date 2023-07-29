"use client";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeartBroken } from "react-icons/fa";

const FavoriteButton = ({ addToFavorites }) => {
  return (
    <div className="absolute -bottom-10 md:-bottom-12 right-0 p-2 hover:bg-purple-900 group rounded-md mt-4">
      <AiOutlineHeart
        onClick={() => {
          addToFavorites();
        }}
        className="relative text-2xl md:text-3xl text-purple-900 hover:scale-105 fast-transition group-hover:text-white"
      />
    </div>
  );
};

export default FavoriteButton;
