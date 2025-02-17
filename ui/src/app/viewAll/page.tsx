"use client";
import React, { useEffect, useState } from "react";
import { getLastPosts } from "../actions/blogActions";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Posts, Post } from "@/app/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "../hooks/useTheme";
import { useRouter } from "next/navigation";

export default function ViewAll() {
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const router = useRouter();
  const [posts, setPosts] = useState<Posts>({
    blogPosts: [] as Post[],
    totalPages: 0,
    totalPosts: 0,
    currentPage: 1,
  } as Posts);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getLastPosts(page, limit);
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, [page, limit]);
  if (!mounted) return null;

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-4 w-full mt-4" />
      </div>
    );
  }

  return (
    <div className="container mx-auto md:px-8 min-w-[280px] max-w-[625px]">
      <button onClick={() => router.push("/")} className="text-blue-500 mt-8">
        Back to Home
      </button>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mt-8 mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-col">
          <h1 className="text-xl">View All Posts</h1>
        </div>
        <span>
          {posts.blogPosts.length} of {posts.totalPosts}
        </span>
      </div>
      {/* Posts List */}
      {posts?.blogPosts?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts.blogPosts.map((post) => {
            const createdAtDate = new Date(post.createdAt).toLocaleDateString();
            return (
              <Card
                key={post._id}
                className={`cursor-pointer p-4 transition-all hover:shadow-lg ${
                  theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"
                }`}
                onClick={() => router.push(`/blog/${post.slug}?from=viewAll`)}
              >
                <CardContent>
                  <div className="flex flex-row space-x-3">
                    <img
                      src={post.thumbnailUrl}
                      alt="thumbnail"
                      className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded-lg min-w-[60px] min-h-[60px]"
                    />

                    <div className="w-full">
                      <TypographyH2>{post.title}</TypographyH2>

                      <div className="flex flex-row justify-between items-baseline align-baseline">
                        <span className="text-sm text-gray-500">
                          Created: {createdAtDate}
                        </span>
                        <div className="flex flex-wrap">
                          {post.tags?.length > 0
                            ? post.tags?.map((tag, index) => (
                                <div
                                  key={index}
                                  className={`rounded-full text-msm border px-2 mr-2 ${tag.color}`}
                                >
                                  {tag.tagText}
                                </div>
                              ))
                            : "no tags added"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <div className="flex flex-row justify-between items-center space-x-2 mt-2 mx-2">
            <div className="space-x-2">
              {posts.blogPosts.length < posts.totalPosts && (
                <>
                  <Button
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={page <= 1}
                  >
                    Prev
                  </Button>

                  <Button
                    onClick={() =>
                      setPage((prev) => Math.min(posts.totalPages, prev + 1))
                    }
                    disabled={
                      page >= posts.totalPages || posts.totalPages === 0
                    }
                  >
                    Next
                  </Button>
                </>
              )}
            </div>
            <span>
              Page: {page} of {posts.totalPages > 0 ? posts.totalPages : 1}
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
