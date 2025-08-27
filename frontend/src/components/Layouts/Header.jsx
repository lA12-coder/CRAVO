import React from "react";
import FullButton from "../ui/FullButton";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="flex justify-between px-6 items-center py-3 bg-Background shadow-lg backdrop-blur-sm border-b">
      <div className="flex space-x-5 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 md:w-10 text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
        {/* Logo placeholder - removed empty img tag */}
        <div className="font-mono text-3xl font-bol">CRAVO</div>
      </div>
      <div className="flex space-x-6 items-center">
        <Link
          to="/login"
          className="transition-transform duration-200 hover:scale-105"
        >
          <FullButton isLogIn>Log in</FullButton>
        </Link>
        <Link
          to="/signup"
          className="transition-transform duration-200 hover:scale-105"
        >
          <FullButton isSignUp>Sign up</FullButton>
        </Link>
      </div>
    </section>
  );
};

export default Header;
