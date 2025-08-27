import React from "react";
import { CategoryList } from "../../Data/FoodCategory";

export default function FoodCategories({
  categories = CategoryList,
  selected,
  onSelect,
}) {
  return (
    <div className="w-full border-b border-Borders bg-white pl-3">
      <div className="mx-auto flex max-w-7xl justify-start items-center gap-3 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {categories.map((name) => {
          const isActive = selected ? selected === name : false;
          return (
            <button
              key={name}
              onClick={() => onSelect?.(name)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-Primary bg-Primary text-PrimaryText lg:text-white lg:bg-Primary"
                  : "border-Borders bg-Background text-PrimaryText hover:bg-white"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
