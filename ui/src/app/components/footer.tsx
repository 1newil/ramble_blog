"use client";

import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div
      className={`bottom-0 left-0 w-full p-4 px-12 transition-colors backdrop-brightness-200`}
    >
      <div className="container mx-auto space-x-2">
        <Link
          href="/"
          className={`hover:text-black hover:underline hover:underline-red`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`hover:text-black hover:underline hover:underline-red`}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`hover:text-black hover:underline hover:underline-red`}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
