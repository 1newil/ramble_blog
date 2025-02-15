"use client";

import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div
      className={`w-full p-4 px-12 transition-colors backdrop-brightness-200 mt-12`}
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
