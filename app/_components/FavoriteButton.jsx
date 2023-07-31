"use client";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeartBroken } from "react-icons/fa";
import { TbHeartPlus } from "react-icons/tb";

const FavoriteButton = ({ addToFavorites, style }) => {
  return (
    <div
      className={
        style ||
        `absolute -bottom-10 md:-bottom-12 right-0 p-2 hover:bg-purple-900 group bg-black shadow-lg rounded-md mt-4`
      }>
      <TbHeartPlus
        onClick={() => {
          addToFavorites();
        }}
        className="relative text-2xl md:text-3xl text-purple-900 hover:scale-105 fast-transition group-hover:text-white"
      />
    </div>
  );
};

export default FavoriteButton;
