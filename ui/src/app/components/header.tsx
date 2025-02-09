"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./theme-toggle";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme } = useTheme();

  return (
    <header
      className={`mx-auto px-6 py-6 flex items-center justify-between transition-colors ${
        theme === "dark" ? "text-white bg-gray-900 " : "text-black"
      }`}
    >
      <div className="flex items-center space-x-2">
        <ChatBubbleOvalLeftEllipsisIcon
          className={`w-8 h-8 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } dark:bg-white rounded-lg`}
        />
        <h1 className="text-2xl font-bold">Ramble</h1>
      </div>
      <div className="flex flex-row space-x-8 items-center">
        <nav className="space-x-4">
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
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
