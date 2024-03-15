import React from "react";
import { categories } from "../data";
import CategoryFilterItem from "./CategoryFilterItem";

const CategoryFilter = () => {
  return (
    <div className="w-full flex flex-col mt-4">
      <div className="flex gap-3 w-full">
        <h3>Filter mosques by category</h3>
      </div>
      <div className="w-full flex gap-1 overflow-x-auto py-1">
        {categories.map((item) => (
          <CategoryFilterItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
