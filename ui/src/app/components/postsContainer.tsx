"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { getLastPosts } from "@/app/actions/blogActions"; // Import remains
import Hero from "./hero";

type Post = {
  _id: string;
  title: string;
  markdownContent: string;
  thumbnailUrl: string;
  slug: string;
  createdAt: string;
};

type PostsContainerProps = {
  initialPosts: Post[];
};

export default function PostsContainer({ initialPosts }: PostsContainerProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [limit, setLimit] = useState(5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getLastPosts(limit);
      setPosts(data);
    };
    fetchPosts();
  }, [limit]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto height-full overflow-auto justify-center">
      <Hero />
      <div className="flex flex-row justify-between items-center mt-8 mb-4">
        <h1 className="text-3xl font-bold ">Latest Blog Posts</h1>
        <section></section>
        <div className="space-x-3">
          <button
            onClick={() => router.push("/markdownEditor")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1 px-2 rounded"
          >
            New Post
          </button>
          <select
            onChange={(e) => setLimit(parseInt(e.target.value))}
            value={limit}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        {posts.map((post) => {
          const createdAtDate = new Date(post.createdAt).toLocaleDateString();

          return (
            <div
              key={post._id}
              className={`flex flex-row cursor-pointer p-2 shadow space-x-3 justify-start ${
                theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"
              }`}
              onClick={() => router.push(`/blog/${post.slug}`)}
            >
              <img
                src={post.thumbnailUrl}
                alt="thumbnail"
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold mb-1">{post.title}</h1>
                <p className="text-gray-500 text-sm">
                  Created: {createdAtDate}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
