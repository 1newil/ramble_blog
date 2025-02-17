"use client";

import React, { useEffect, useState } from "react";
import { getPostBySlug } from "@/app/actions/blogActions";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import {
  atomDark,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "@/app/hooks/useTheme";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tag } from "@/app/types/types";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";

type Post = {
  _id: string;
  title: string;
  markdownContent: string;
  thumbnailUrl: string;
  slug: string;
  createdAt: string;
  tags: Tag[];
} | null;

export default function Page() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const router = useRouter();
  useEffect(() => {
    if (!slug || Array.isArray(slug)) return; // Ensure slug is a valid string

    const fetchPostBySlug = async () => {
      try {
        const data = await getPostBySlug(slug);
        setPost(data);
      } catch (error) {
        setPost(error as Post);
      } finally {
        setLoading(false);
      }
    };

    fetchPostBySlug();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-4 w-full mt-4" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-gray-500 mt-10">Post not found</div>
    );
  }

  return (
    <div className=" min-h-screen md:mx-32 px-4 py-8">
      <div className="container mx-auto min-w-[280px] max-w-[625px]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/blog/${slug}`}>
                {post.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="shadow-lg mt-1">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <img
                src={post.thumbnailUrl}
                alt={post.title}
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
              <div className="w-full">
                <div className="flex flex-row space-x-3 items-baseline">
                  <CardTitle className="text-2xl font-bold">
                    {post.title}
                  </CardTitle>
                  {process.env.NEXT_PUBLIC_MODE === "ADMIN" && (
                    <button
                      onClick={() =>
                        router.push(`/markdownEditor/${post.slug}`)
                      }
                      className="text-sm text-blue-500 hover:underline"
                    >
                      <FaEdit />
                    </button>
                  )}
                </div>
                <div className="flex flex-row justify-between items-baseline align-baseline">
                  <span className="text-sm">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex flex-wrap">
                    {post.tags.length > 0
                      ? post.tags.map((tag, index) => (
                          <div
                            key={index}
                            className={`rounded-full text-msm border px-2 mr-2 mb-2 ${tag.color}`}
                          >
                            {tag.tagText}
                          </div>
                        ))
                      : "no tags added"}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
        <div className="markdown leading-snug font-medium mt-4 md:mx-12">
          <ReactMarkdown
            remarkPlugins={[remarkBreaks, remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    style={theme === "dark" ? atomDark : prism}
                    language={match[1]}
                    PreTag="div"
                    showLineNumbers
                    wrapLongLines
                    customStyle={{
                      fontSize: "0.875rem",
                      padding: "1rem",
                      borderRadius: "6px",
                      overflow: "auto",
                      maxHeight: "100%",
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="p-1 rounded" {...props}>
                    {children}
                  </code>
                );
              },
              img({ src, alt }) {
                return (
                  <img
                    src={src || ""}
                    alt={alt || "Markdown image"}
                    className="w-96 h-auto rounded-lg shadow-md"
                  />
                );
              },
            }}
          >
            {post.markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
