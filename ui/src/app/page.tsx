"use client";

import React from "react";
import MarkdownInput from "./components/markdown_input";

export default function Home() {
  return (
    <div className={`transition-colors`}>
      <MarkdownInput />
    </div>
  );
}
