"use client";

import React from "react";

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

const text = `> "Blessed are the curious, for they shall have adventures."  
> — Lovelle Drachman  

> "If you think you are too small to make an impact, try going to bed with a mosquito." 
> — Anita Borg 

> - "Imagination is the discovering faculty, pre-eminently. It is that which penetrates into the unseen worlds around us, the worlds of science."
> — Ada Lovelace
`;

export default function Page() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen md:mx-32 px-4 py-8">
      <div className="container mx-auto min-w-[280px] max-w-[625px]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/blog/about`}>{"About"}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="markdown leading-snug font-medium mt-12 md:mx-12">
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
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
