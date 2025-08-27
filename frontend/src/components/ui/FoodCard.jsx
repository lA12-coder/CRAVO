import React from "react";

const FoodCard = ({ item, onClick }) => {
  return (
    <button
      onClick={() => onClick?.(item)}
      className="text-left w-full group overflow-hidden rounded-xl border border-Borders bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-Primary/50 h-[350px] flex flex-col justify-between"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-Background">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      {/* Title and category */}
      <div className="flex items-start flex-col px-4  justify-between gap-2">
        <h3 className="text-base font-semibold text-PrimaryText">
          {item.name}
        </h3>
        <span className="rounded bg-Background px-2 py-0.5 text-xs font-medium text-SecondaryText">
          {item.category}
        </span>
      </div>
      <div className="space-y-2 p-4 pt-0">
        <p className="line-clamp-2 text-sm text-SecondaryText">
          {item.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-base font-semibold text-Primary">
            {item.price.toFixed(2)} Birr
          </span>
          <button className="rounded-md bg-Primary px-3 py-1.5 text-sm font-medium text-white hover:brightness-95">
            Add
          </button>
        </div>
      </div>
    </button>
  );
};

export default FoodCard;
