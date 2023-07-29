"use client";
import { FaHeartBroken } from "react-icons/fa";

const RemoveFavoriteButton = ({ removeFromFavorites }) => {
  return (
    <div
      className="absolute -bottom-10 md:-bottom-12 right-0 p-2 hover:bg-purple-900 group rounded-md mt-4"
      onClick={() => {
        removeFromFavorites();
      }}>
      <FaHeartBroken className="relative text-2xl md:text-3xl text-purple-900 hover:scale-105 fast-transition group-hover:text-white" />
    </div>
  );
};

export default RemoveFavoriteButton;
