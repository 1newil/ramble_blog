"use client";

import React, { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import CodeMirror from "@uiw/react-codemirror";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { EditorView } from "@codemirror/view";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import {
  atomDark,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { SubmitButton } from "./submitButton";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import remarkGfm from "remark-gfm";
import { uploadImage } from "../actions/imageActions";

export default function MarkdownInput() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const customStyles = EditorView.theme({
    ".cm-activeLine": { backgroundColor: "transparent !important" }, // Removes highlight
    ".cm-gutters": { backgroundColor: "#0d1118" }, // Line number gutter color
  });
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(formData: FormData) {
    setStatus("Uploading...");
    const result = await uploadImage(null, formData);

    if (result.success) {
      setImageUrl(result.imageUrl);
      setStatus("Upload successful!");
    } else {
      setStatus("there was an error uploading your image");
    }
  }

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];

      if (file && file.type.startsWith("image/")) {
        const formData = new FormData();
        // Replace spaces in the file name with underscores
        const sanitizedFileName = file.name.replace(/\s+/g, "_");

        // Rename the file before appending to FormData
        const renamedFile = new File([file], sanitizedFileName, {
          type: file.type,
        });
        formData.append("file", renamedFile);

        // Upload to S3 using the Next.js Server Action
        const result = await uploadImage(null, formData);

        if (result.success) {
          setText((prev) => prev + `\n\n![Screenshot](${result.imageUrl})\n\n`);
        } else {
          console.error("Upload failed:", result);
        }
      }
    },
    []
  );

  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="title" className="text-sm font-medium text-gray-500">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`border-2 rounded-lg p-2 mb-2 max-w-sm`}
        />
      </div>
      <div
        className={`border-2 rounded-lg shadow-md p-4 flex flex-col overflow-hidden`}
      >
        {/* Header Section */}
        <div
          className={`flex justify-between items-center mb-4 border-b-2 pb-3`}
        >
          <div className="space-x-2">
            <Button
              onClick={() => setIsPreviewMode(false)}
              className={`${
                !isPreviewMode ? "bg-gray-800" : "bg-gray-500"
              } text-white`}
            >
              Edit
            </Button>
            <Button
              onClick={() => setIsPreviewMode(true)}
              className={`${
                isPreviewMode ? "bg-gray-800" : "bg-gray-500"
              } text-white`}
            >
              Preview
            </Button>
          </div>
          <SubmitButton
            body={text}
            title={title}
            setText={setText}
            setTitle={setTitle}
          />
        </div>

        {/* Content Section */}
        <div className={`border-2 rounded-lg flex-grow overflow-auto p-2 flex`}>
          {isPreviewMode ? (
            mounted ? (
              <div
                className={`markdown p-4 rounded-md w-full `}
                style={{ maxHeight: "100%" }}
              >
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
                          className="w-64 h-auto rounded-lg shadow-md"
                        />
                      );
                    },
                  }}
                >
                  {text}
                </ReactMarkdown>
              </div>
            ) : (
              <p className={`text-gray-500`}>Loading preview...</p>
            )
          ) : mounted ? (
            <div
              className={`w-full overflow-auto min-h-96 ${
                theme === "dark" ? "CODEMIRROR_CONTAINER" : ""
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <CodeMirror
                theme={theme === "dark" ? githubDark : githubLight}
                value={text}
                onChange={(value) => setText(value)}
                extensions={[
                  customStyles,
                  markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                  }),
                ]}
                placeholder={`# Write your markdown here...`}
              />
            </div>
          ) : (
            <p className="text-gray-500">Loading editor...</p>
          )}
        </div>
      </div>
    </div>
  );
}
