"use client";

import React from "react";
import MarkdownInput from "@/app/components/markdown_input";

export default function Home() {
  return (
    <div className={`min-h-screen p-8 transition-colors`}>
      <MarkdownInput />
    </div>
  );
}
