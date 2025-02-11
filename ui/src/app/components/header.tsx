"use client";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./theme-toggle";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header
      className={`mx-auto px-6 py-6 flex items-center justify-between transition-colors`}
    >
      <div className="flex items-center space-x-2">
        <ChatBubbleOvalLeftEllipsisIcon className={`w-8 h-8 rounded-lg`} />
        <h1 className="text-2xl font-bold">Ramble</h1>
      </div>
      <div className="flex flex-row space-x-8 items-center">
        <nav className="space-x-4">
          <Link href="/" className={`hover:underline`}>
            Home
          </Link>
          <Link href="/about" className={`hover:underline`}>
            About
          </Link>
          <Link href="/contact" className={` hover:underline`}>
            Contact
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
