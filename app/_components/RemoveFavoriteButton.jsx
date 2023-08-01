"use client";
import { FaHeartBroken } from "react-icons/fa";
import { TbHeartMinus } from "react-icons/tb";

const RemoveFavoriteButton = ({ removeFromFavorites, isRemoving }) => {
  return (
    <div
      className="absolute -bottom-10 md:-bottom-12 right-0 p-2 hover:bg-purple-900 group rounded-md mt-4"
      onClick={() => {
        if (!isRemoving) {
          removeFromFavorites();
        }
      }}>
      <TbHeartMinus className="relative text-2xl md:text-3xl text-purple-900 hover:scale-105 fast-transition group-hover:text-white" />
    </div>
  );
};

export default RemoveFavoriteButton;
