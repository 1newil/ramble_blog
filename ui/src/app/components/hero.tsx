"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const icons = [
  { name: "linkedin", icon: FaLinkedin, url: "https://www.linkedin.com/" },
  { name: "github", icon: FaGithub, url: "https://www.github.com/" },
  { name: "x", icon: FaXTwitter, url: "https://www.x.com/" },
];

export default function Hero() {
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-center mt-12">
      <div className="flex flex-row max-w-3xl mx-auto space-x-3 align-center rounded-lg p-12">
        <div className="flex flex-col">
          <Image
            alt="an image of a blogging laptop on a desk"
            src="/blogHero.png"
            width={400}
            height={475}
            className="rounded-lg"
          />
          <span className="text-xs hover:text-blue-600">
            <a href="https://openai.com/index/dall-e-3/" target="_blank">
              image credit: DALL-E 🖌️
            </a>
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Welcome to Ramble 📪</h1>
          <p className="text-sm">
            A place to collect my thoughts on all topics. <br />
            Enjoy the randomness...
          </p>
          <div
            className={`flex space-x-3 mt-4 ml- ${
              theme === "dark" ? "text-gray-300" : "text-gray-900"
            }`}
          >
            {icons.map((icon) => {
              const Icon = icon.icon;
              return (
                <a
                  href={icon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={icon.name}
                  className={
                    theme === "dark"
                      ? "hover:text-gray-400"
                      : "hover:text-gray-400"
                  }
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
