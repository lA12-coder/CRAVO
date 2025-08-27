import React from "react";

export default function AppHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-Borders bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 overflow-x-clip overflow-hi">
      <div className="w-full flex flex-col gap-[15px] justify-center px-3 py-3 items-center md:flex-row md:justify-between md:h-fit md:px-8 mx-auto">
        {/*Left(Logo and menu) of the Header */}

        <div className="flex gap-4">
          <button
            type="button"
            aria-label="Open menu"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-Primary hover:bg-Background focus:outline-none focus:ring-2 focus:ring-Primary lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M3.75 6.75a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-Primary text-white">
              <span className="text-base font-bold">C</span>
            </div>
            <span className="text-lg font-bold text-PrimaryText">CRAVO</span>
          </div>
        </div>

        {/* Middle (Search input) of the Header  */}
        <div className="mx-4 flex w-full min-w-300px items-center gap-2 rounded-full border border-Borders bg-white px-3 py-2 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-SecondaryText"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 104.243 12.03l3.238 3.239a.75.75 0 101.06-1.06l-3.239-3.239A6.75 6.75 0 0010.5 3.75zm-5.25 6.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search restaurants and dishes"
            className="w-full bg-transparent text-sm text-PrimaryText placeholder-SecondaryText outline-none"
          />
        </div>
        {/* Right side or (cart and profile section)of the Header */}
        <nav className="flex justify-center items-center gap-4 w-full md:w-fit">
          <button className="relative inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-PrimaryText hover:bg-Background mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 100 6 3 3 0 000-6zm0 0h8.25m-8.25 0L6.106 5.272M21.75 9h-13.5"
              />
            </svg>
            <span>Cart</span>
            <span className="absolute right-0 -top-1 translate-x-1/2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-Sucess px-1 text-xs font-semibold text-white">
              0
            </span>
          </button>
          <div className="flex ml-3 space-x-2 items-center justify-center h-fit">
            <img
              src="https://i.pravatar.cc/100?img=13"
              alt="Profile"
              className="h-12 w-12 object-cover rounded-[50%] ring-Borders"
            />
            <p className="text-SecondaryText text-[12px]">Hello, user</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
