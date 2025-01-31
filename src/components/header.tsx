import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="container mx-auto px-48 py-2 flex items-center justify-between text-black">
      <div className="flex items-center space-x-1">
        <Image src="/quantum_socks.webp" alt="logo" width={75} height={75} />
        <span className="text-xl font-bold">Quantum Socks</span>
      </div>
      <div className="space-x-4 text-gray-500">
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
