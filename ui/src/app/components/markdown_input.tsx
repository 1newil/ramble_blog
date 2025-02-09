"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Textarea } from "@/app/components/ui/textarea";
import remarkBreaks from "remark-breaks";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import {
  atomDark,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownInput() {
  const [text, setText] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div
      className={`border border-gray-300 rounded-lg shadow-md p-6 flex flex-col h-screen overflow-hidden ${
        theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white"
      }`}
    >
      {/* Header Section */}
      <div
        className={`flex justify-between items-center mb-4 border-b pb-3 ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <h2
          className={`text-lg font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Markdown Editor
        </h2>
        <div className="space-x-2">
          <Button
            onClick={togglePreviewMode}
            disabled={!isPreviewMode}
            className={`${
              isPreviewMode ? "bg-blue-500" : "bg-gray-500"
            } text-white`}
          >
            Edit
          </Button>
          <Button
            onClick={togglePreviewMode}
            disabled={isPreviewMode}
            className={`${
              !isPreviewMode ? "bg-blue-500" : "bg-gray-500"
            } text-white`}
          >
            Preview
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div
        className={`border rounded-lg flex-grow overflow-auto p-4 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-100 border-gray-300"
        } flex`}
      >
        {isPreviewMode ? (
          mounted ? (
            <div
              className={`markdown p-4 border rounded-md w-full h-full overflow-auto ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkBreaks]}
                components={{
                  code({ node, className, children, ...props }) {
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
                          backgroundColor:
                            theme === "dark" ? "#1e1e1e" : "#f5f5f5",
                          overflow: "auto",
                          maxHeight: "100%",
                        }}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className={`p-1 rounded ${
                          theme === "dark"
                            ? "bg-gray-700 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {text}
              </ReactMarkdown>
            </div>
          ) : (
            <p
              className={`text-gray-500 ${
                theme === "dark" ? "dark:text-gray-400" : ""
              }`}
            >
              Loading preview...
            </p>
          )
        ) : (
          <div className="relative flex w-full h-full">
            {/* Line Numbers Container */}
            <div
              className={`px-3 py-2 text-right text-sm select-none border-r ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-gray-400"
                  : "bg-gray-200 border-gray-300 text-gray-600"
              }`}
              style={{ width: "40px", minWidth: "40px" }} // Fixed width for alignment
            >
              {text.split("\n").map((_, i) => (
                <div key={i} className="leading-0">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Textarea Container */}
            <div className="flex-grow">
              <Textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                className={`w-full h-full border-none p-2 resize-none overflow-auto ${
                  theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
                }`}
                placeholder="Write your markdown here..."
                style={{ paddingLeft: "10px" }} // Prevent text from touching the numbers
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
