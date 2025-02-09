"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button className="p-2 rounded-full transition-colors duration-300 bg-gray-200 dark:bg-gray-700">
      {theme === "dark" ? (
        <SunIcon
          onClick={() => setTheme("light")}
          className="w-4 h-4 text-black"
        />
      ) : (
        <MoonIcon
          onClick={() => setTheme("dark")}
          className="w-4 h-4 text-gray-900"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
