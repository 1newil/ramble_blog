"use client";
import React from "react";
import MarkdownInput from "../../components/markdown_input";
import { useRouter } from "next/navigation";
export default function MarkdownInputPage() {
  const router = useRouter();
  return (
    <div className="mx-32 mb-4 px-auto mt-4 space-y-4">
      <button onClick={() => router.push("/")} className="text-blue-500">
        Back to Home
      </button>
      <h1 className="text-3xl font-bold">Edit Post</h1>
      <MarkdownInput />
    </div>
  );
}
