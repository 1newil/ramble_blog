"use client";

import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <div
      className={`fixed bottom-0 left-0 w-full p-4 px-48 transition-colors ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="container mx-auto space-x-2">
        <Link
          href="/"
          className={`hover:text-black hover:underline hover:underline-red ${
            theme === "dark" ? "dark:text-gray-400" : "text-gray-500"
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`hover:text-black hover:underline hover:underline-red ${
            theme === "dark" ? "dark:text-gray-400" : "text-gray-500"
          }`}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`hover:text-black hover:underline hover:underline-red ${
            theme === "dark" ? "dark:text-gray-400" : "text-gray-500"
          }`}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
