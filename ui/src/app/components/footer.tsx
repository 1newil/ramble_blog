"use client";

import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-auto p-4 px-12 shadow-md">
      <div className="container mx-auto flex justify-center space-x-4">
        <Link href="/" className="hover:text-black hover:underline">
          Home
        </Link>
        <Link href="/about" className="hover:text-black hover:underline">
          About
        </Link>
      </div>
    </footer>
  );
}
