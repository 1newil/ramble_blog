"use client";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./theme-toggle";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { TypographyH1 } from "@/components/ui/typography";
export default function Header() {
  const router = useRouter();
  return (
    <header
      className={`mx-auto mt-auto px-6 py-6 flex items-center justify-between transition-colors backdrop-brightness-200`}
    >
      <button
        onClick={() => router.push("/")}
        className="flex items-center space-x-2"
      >
        <ChatBubbleOvalLeftEllipsisIcon className={`w-8 h-8 rounded-lg`} />
        <TypographyH1>Ramble</TypographyH1>
      </button>

      <div className="flex flex-row space-x-8 items-center">
        <nav className="space-x-4">
          <Link href="/" className={`hover:underline`}>
            Home
          </Link>
          <Link href="/about" className={`hover:underline`}>
            About
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
