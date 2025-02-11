"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Post = {
  _id: string;
  title: string;
  markdownContent: string;
  thumbnailUrl: string;
  createdAt: string;
};

type PostsContainerProps = {
  posts: Post[];
};

export default function PostsContainer({ posts }: PostsContainerProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>loading...</div>;
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 gap-4">
        {posts &&
          posts.map((post) => {
            console.log("Thumbnail URL:", post);
            const createdAtDate = new Date(post.createdAt).toLocaleDateString();
            return (
              <div
                key={post._id}
                className={`flex flex-row cursor-pointer p-4 shadow space-x-3 ${
                  theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"
                }`}
              >
                <img
                  src={post.thumbnailUrl}
                  alt="thumbnail"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
                  <p className="text-gray-500">{createdAtDate}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
