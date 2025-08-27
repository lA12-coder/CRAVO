import React from "react";
import { FoodItems } from "../../Data/FoodListData";
import FoodCard from "../ui/FoodCard";
export default function FoodList({ items = FoodItems, filter, onItemClick }) {
  const filtered =
    filter && filter != "All"
      ? items.filter((i) => i.category === filter)
      : items;
  return (
    <section className=" flex justify-center">
      <div className=" mx-3 my-5 justify-center lg:justify-start lg:ml-8 flex gap-5 flex-wrap">
        {filtered.map((item) => (
          <div className="w-[300px]">
            <FoodCard key={item.id} item={item} onClick={onItemClick} />
          </div>
        ))}
      </div>
    </section>
  );
}
