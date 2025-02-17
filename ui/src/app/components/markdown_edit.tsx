"use client";

import React, { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import CodeMirror from "@uiw/react-codemirror";
import { Button } from "../../components/ui/button";
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
import { Tag } from "../types/types";
export default function MarkdownInput() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState<Tag>({
    tagText: "",
    color: "",
  });
  const [currentColor, setCurrentColor] = useState<string>(
    "bg-white text-black"
  );
  const customStyles = EditorView.theme({
    ".cm-activeLine": { backgroundColor: "transparent !important" }, // Removes highlight
    ".cm-gutters": { backgroundColor: "#0d1118" }, // Line number gutter color
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>, type: string) => {
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
        const result = await uploadImage(formData);

        if (result.success) {
          if (type === "imageUrl") {
            setImageUrl(result.imageUrl);
          } else if (type === "markdownImage") {
            setText(
              (prev) => prev + `\n\n![Screenshot](${result.imageUrl})\n\n`
            );
          }
        } else {
          console.error("Upload failed:", result);
        }
      }
    },
    []
  );

  const handleAddTag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (tags.some((t) => t === tag)) {
      alert("Tag already exists");
      return;
    }
    if (tags.length >= 3) {
      alert("Maximum of 3 tags allowed");
      return;
    }
    setTags((prev) => [...prev, tag]);
    setTag({
      tagText: "",
      color: "",
    });
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t.tagText !== tag));
  };

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
          className={`border-2 rounded-lg p-2 mb-2 max-w-lg`}
        />
        <label
          htmlFor="thumbnailUrl"
          className="text-sm font-medium text-gray-500"
        >
          Thumbnail URL
        </label>
        <div
          onDrop={(event) => handleDrop(event, "imageUrl")}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="text"
            id="ImageUrl"
            placeholder="Thumbnail Image Url"
            value={imageUrl || ""}
            onChange={(e) => setImageUrl(e.target.value)}
            className={`border-2 rounded-lg p-2 mb-2 max-w-lg`}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="tags" className="text-sm font-medium text-gray-500">
            Tags
          </label>
          <div className="flex flex-row justify-between items-baseline align-baseline">
            <div className="space-x-2">
              <input
                type="text"
                id="ImageUrl"
                placeholder="Tags"
                value={tag.tagText || ""}
                onChange={(e) =>
                  setTag({
                    tagText: e.target.value,
                    color: currentColor,
                  })
                }
                className={`border-2 rounded-lg p-2 mb-2 max-w-28`}
              />
              <select
                onChange={(e) => {
                  const newColor = e.target.value; // Capture the new color
                  setCurrentColor(newColor); // Update the state
                  setTag((prevTag) => ({
                    ...prevTag,
                    color: newColor, // Use the updated color
                  }));
                }}
                className="border-2 rounded-lg p-2 mb-2 max-w-28"
              >
                <option value="bg-white text-black">white</option>
                <option value="bg-red-600 text-white">red</option>
                <option value="bg-sky-600 text-white">blue</option>
                <option value="bg-green-600 text-white">green</option>
                <option value="bg-purple-600 text-white">purple</option>
                <option value="bg-yellow-600 text-white">yellow</option>
                <option value="bg-orange-600 text-white">orange</option>
              </select>
              <Button onClick={(e) => handleAddTag(e)}>+</Button>
            </div>
            <div className="flex flex-wrap">
              {tags.length > 0
                ? tags.map((tag, index) => (
                    <div
                      key={index}
                      className={`rounded-md border p-1 mr-2 mb-2 ${tag.color}`}
                    >
                      {tag.tagText}
                      <Button
                        size={"xs"}
                        className="p-2 rounded-full ml-2"
                        onClick={() => handleRemoveTag(tag.tagText)}
                      >
                        x
                      </Button>
                    </div>
                  ))
                : "no tags added"}
            </div>
          </div>
        </div>
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
            thumbnailUrl={imageUrl}
            tags={tags}
          />
        </div>

        {/* Content Section */}
        <div className={`border-2 rounded-lg flex-grow overflow-auto p-2 flex`}>
          {isPreviewMode ? (
            mounted ? (
              <div
                className={`container markdown mx-auto p-4 rounded-md w-full md:px-8 min-w-[280px] max-w-[625px]`}
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
                          className="w-96 h-auto rounded-lg shadow-md"
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
              onDrop={(event) => handleDrop(event, "markdownImage")}
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
