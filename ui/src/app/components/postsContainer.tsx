"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { getLastPosts } from "@/app/actions/blogActions";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="container mx-auto h-full overflow-auto justify-center px-4">
      {/* Header */}
      <div className="flex flex-row justify-between items-center mt-8 mb-6">
        <TypographyH1>Latest Posts</TypographyH1>
        <div className="flex space-x-3">
          {process.env.mode === "admin" && (
            <Button
              onClick={() => router.push("/markdownEditor")}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              New Post
            </Button>
          )}
          <Select
            onValueChange={(value) => setLimit(parseInt(value))}
            defaultValue={limit.toString()}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts.map((post) => {
            const createdAtDate = new Date(post.createdAt).toLocaleDateString();
            return (
              <Card
                key={post._id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"
                }`}
                onClick={() => router.push(`/blog/${post.slug}`)}
              >
                <CardContent className="flex flex-row p-4 items-center space-x-4">
                  <img
                    src={post.thumbnailUrl}
                    alt="thumbnail"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <TypographyH2>{post.title}</TypographyH2>
                    <span className="text-sm">Created: {createdAtDate}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-96 space-y-6">
          <span className="text-6xl">🏄‍♀️</span>
          <TypographyH1>No posts found</TypographyH1>
        </div>
      )}
    </div>
  );
}
