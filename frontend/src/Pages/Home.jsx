import React, { useState } from "react";
import AppHeader from "../components/common/AppHeader";
import AppSidebar from "../components/common/AppSidebar";
import FoodCategories from "../components/food/FoodCategories";
import FoodList from "../components/food/FoodList";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState("All");

  return (
    <div
      className="min-h-screen bg-Background text-PrimaryText overflow-hidden
    "
    >
      <AppHeader onMenuClick={() => setSidebarOpen(true)} />
      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-3">
        <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-h-[calc(100vh-4rem)]">
            <FoodCategories selected={category} onSelect={setCategory} />
          <FoodList filter={category} />
        </main>
      </div>
    </div>
  );
}
