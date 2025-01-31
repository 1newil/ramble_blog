import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 p-4 px-48">
      <div className="container mx-auto space-x-2">
        <Link
          href="/"
          className="hover:text-black hover:underline hover:underline-red"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="hover:text-black hover:underline hover:underline-red"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="hover:text-black hover:underline hover:underline-red"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
