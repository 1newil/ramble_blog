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

type Posts = {
  blogPosts: Post[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
};

type PostsContainerProps = {
  initialPosts: Posts;
};

export default function PostsContainer({ initialPosts }: PostsContainerProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const [posts, setPosts] = useState<Posts>(initialPosts);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getLastPosts(page, limit);
      setPosts(data);
    };
    fetchPosts();
  }, [page, limit]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto md:px-8 min-w-[280px] max-w-[625px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6 md:mt-8 mb-6 space-y-4 md:space-y-0">
        <TypographyH1>Latest Posts</TypographyH1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {process.env.NEXT_PUBLIC_MODE === "ADMIN" && (
            <Button
              onClick={() => router.push("/markdownEditor")}
              className="bg-emerald-600 hover:bg-emerald-700 text-sm md:text-base min-w-[100px]"
            >
              New Post
            </Button>
          )}
          <Select
            onValueChange={(value) => {
              setLimit(parseInt(value));
              if (page === posts.totalPages) {
                setPage(posts.currentPage - 1);
              }
            }}
            defaultValue={limit.toString()}
          >
            <SelectTrigger className="w-[100px] min-w-[80px] text-sm md:text-base">
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
      {posts?.blogPosts?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts.blogPosts.map((post) => {
            const createdAtDate = new Date(post.createdAt).toLocaleDateString();
            return (
              <Card
                key={post._id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"
                }`}
                onClick={() => router.push(`/blog/${post.slug}`)}
              >
                <CardContent className="flex flex-col sm:flex-row p-4 items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 min-h-[100px]">
                  <img
                    src={post.thumbnailUrl}
                    alt="thumbnail"
                    className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded-lg min-w-[60px] min-h-[60px]"
                  />
                  <div className="text-center sm:text-left w-full">
                    <TypographyH2>{post.title}</TypographyH2>
                    <span className="text-sm text-gray-500">
                      Created: {createdAtDate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <div className="flex flex-row justify-between items-center space-x-2 mt-2 mx-2">
            <div className="space-x-2">
              {page > 1 && (
                <Button
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  prev
                </Button>
              )}
              {page < posts.totalPages && (
                <Button
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  next
                </Button>
              )}
            </div>
            <span>
              Page: {page} of {posts.totalPages}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-72 space-y-4">
          <span className="text-4xl md:text-6xl">🏄‍♀️</span>
          <TypographyH1>No posts found</TypographyH1>
        </div>
      )}
    </div>
  );
}
