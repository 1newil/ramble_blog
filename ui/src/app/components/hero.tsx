"use client";

import React from "react";
import Image from "next/image";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { useRouter } from "next/navigation";

const icons = [
  {
    name: "linkedin",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/alexhong240/",
  },
  {
    name: "github",
    icon: FaGithub,
    url: "https://github.com/alexhong3000/ramble_blog",
  },
  { name: "x", icon: FaXTwitter, url: "https://x.com/vercel" },
];

export default function Hero() {
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-12">
      <Card className="max-w-2xl mx-auto rounded-lg p-6 shadow-md">
        <CardContent className="flex flex-col md:flex-row items-center gap-6">
          {/* Text Section */}
          <div className="md:w-3/4 font-bold">
            <TypographyH1>Ramble 📪</TypographyH1>
            <p className="text-md mb-4 mt-2">
              A platform for sharing and exploring my ideas on various subjects.
            </p>

            <Button variant="secondary" onClick={() => router.push("/viewAll")}>
              View Posts
            </Button>

            {/* Social Icons */}
            <div className="flex mt-2">
              {icons.map((icon) => {
                const Icon = icon.icon;
                return (
                  <Button
                    key={icon.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="mr-2"
                  >
                    <a
                      href={icon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-400"
                    >
                      <Icon size={18} />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex flex-col items-end md:w-3/4">
            <Image
              alt="An image of a laptop on a desk"
              src="/blogHero.png"
              className="rounded-lg"
              width={250}
              height={200}
            />
            <small className="text-xxs font-medium justify-end">
              <a
                href="https://openai.com/index/dall-e-3/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                DALL-E 🖌️
              </a>
            </small>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
