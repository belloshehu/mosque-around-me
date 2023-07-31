"use client";
import { favoritePageTabs } from "../data";
import TabCollection from "../_components/TabCollection";
import FavoriteMosques from "../_components/FavoriteMosques";
import FavoriteVerses from "../_components/FavoriteVerses";

const FavouritePage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary">Favorites</h2>
      <div className="w-full flex flex-col items-center justify-center mt-5 overflow-x-hidden">
        <TabCollection tabDataArray={favoritePageTabs}>
          {/* mosque content */}
          <FavoriteMosques />
          {/* verses content */}
          <FavoriteVerses />
        </TabCollection>
      </div>
    </div>
  );
};

export default FavouritePage;
