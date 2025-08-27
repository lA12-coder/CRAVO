import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/home",
    label: "Home",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M11.47 3.841a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-.72-.72V18a3 3 0 01-3 3h-2.25a.75.75 0 01-.75-.75v-3.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v3.75a.75.75 0 01-.75.75H6.75A3 3 0 013 18v-6.318l-.72.72a.75.75 0 01-1.06-1.06l7.5-7.5z" />
      </svg>
    ),
  },
  {
    to: "/orders",
    label: "Orders",
    icon: () => (
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
          d="M3 3h18M3 7.5h18M3 12h18M3 16.5h18M3 21h18"
        />
      </svg>
    ),
  },
  {
    to: "/favorites",
    label: "Favorites",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M11.645 20.91l-.007-.003-.022-.01a15.247 15.247 0 01-1.028-.508 25.18 25.18 0 01-4.244-2.924C3.688 15.036 2.25 13.095 2.25 10.75 2.25 8.264 4.284 6.25 6.75 6.25c1.354 0 2.66.5 3.65 1.398l.6.535.6-.535A5.25 5.25 0 0115.25 6.25c2.466 0 4.5 2.014 4.5 4.5 0 2.345-1.438 4.285-4.094 6.715a25.175 25.175 0 01-4.244 2.924 15.247 15.247 0 01-1.028.508l-.022.01-.007.003-.003.001a.75.75 0 01-.59 0l-.003-.001z" />
      </svg>
    ),
  },
  {
    to: "/addresses",
    label: "Addresses",
    icon: () => (
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
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.143-7.5 10.5-7.5 10.5S4.5 17.643 4.5 10.5A7.5 7.5 0 1119.5 10.5z"
        />
      </svg>
    ),
  },
  {
    to: "/profile",
    label: "Profile",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM4.5 20.25a8.25 8.25 0 0115 0V21a.75.75 0 01-.75.75H5.25A.75.75 0 014.5 21v-.75z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    to: "/support",
    label: "Support",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M18 13a3 3 0 10-3-3h-3a3 3 0 100 6v4.5a1.5 1.5 0 003 0V17a3 3 0 003-3z" />
      </svg>
    ),
  },
  {
    to: "/settings",
    label: "Settings",
    icon: () => (
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
          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894a1.125 1.125 0 001.623.79l.763-.44a1.125 1.125 0 011.45.3l.773 1.083c.33.463.303 1.086-.074 1.5l-.66.694c-.334.352-.414.878-.198 1.311l.398.8c.214.43.14.95-.204 1.3l-.573.576c-.327.328-.85.42-1.276.214l-.861-.4a1.125 1.125 0 00-1.334.284l-.59.65c-.38.418-1.02.492-1.497.17l-.797-.53a1.125 1.125 0 00-1.45.12l-.984.94a1.125 1.125 0 01-1.59-.06l-.774-1.08a1.125 1.125 0 01.21-1.56l.777-.592c.39-.298.517-.85.263-1.28l-.399-.66a1.125 1.125 0 01.21-1.42l.75-.75M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export default function AppSidebar({ open, onClose }) {
  return (
    <aside
      className={`fixed left-0 inset-y-0 left-0 z-50 w-72 transform border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-in-out ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:static lg:translate-x-0`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <span className="text-sm font-semibold text-SecondaryText">Menu</span>
        <button
          onClick={onClose}
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-sidebar-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.714 4.715a.75.75 0 11-1.06 1.06L12 11.646l-4.715 4.715a.75.75 0 11-1.06-1.06l4.714-4.715-4.714-4.715a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <nav className="space-y-1 px-2 py-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : ""
              }`
            }
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
