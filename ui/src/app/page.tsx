"use client";

import React from "react";
import MarkdownInput from "@/app/components/markdown_input";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen p-8 transition-colors ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <MarkdownInput />
    </div>
  );
}
