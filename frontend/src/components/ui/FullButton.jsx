import React from "react";
import { cn } from "../../lib/utils";

const FullButton = ({ isBlack, isWhite, isSignUp, isLogIn, children }) => {
  return (
    <button
      className={cn(
        // Base styles with enhanced visual effects
        "relative px-4 py-2.5 text-sm font-semibold rounded-xl border-0 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95",
        "shadow-lg hover:shadow-2xl",
        "backdrop-blur-sm",
        "focus:outline-none focus:ring-4 focus:ring-opacity-50",

        // Sign Up button - food delivery themed gradient
        isSignUp && [
          "bg-gradient-to-r from-orange-500 via-red-500 to-orange-600",
          "hover:from-orange-400 hover:via-red-400 hover:to-orange-500",
          "text-white font-bold",
          "shadow-orange-500/25 hover:shadow-orange-500/40",
          "focus:ring-orange-500/30",
          "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-orange-400 before:via-red-400 before:to-orange-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-20",
          "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-r after:from-orange-500 after:via-red-500 after:to-orange-600 after:opacity-0 after:blur-xl after:transition-all after:duration-300 hover:after:opacity-40 hover:after:blur-2xl",
        ],

        // Log In button - elegant outline with food-themed hover fill
        isLogIn && [
          "bg-transparent border-2 border-orange-500 text-orange-600",
          "hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:border-transparent hover:text-white",
          "shadow-orange-500/20 hover:shadow-orange-500/40",
          "focus:ring-orange-500/30",
          "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-orange-500 before:to-red-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10",
          "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-r after:from-orange-600 after:to-red-600 after:opacity-0 after:blur-xl after:transition-all after:duration-300 hover:after:opacity-30 hover:after:blur-2xl",
        ],

        // Default button styles - food delivery themed
        !isSignUp &&
          !isLogIn && [
            "bg-gradient-to-r from-orange-500 to-red-500 text-white",
            "hover:from-orange-400 hover:to-red-400",
            "shadow-orange-500/25 hover:shadow-orange-500/40",
            "focus:ring-orange-500/30",
          ]
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default FullButton;
