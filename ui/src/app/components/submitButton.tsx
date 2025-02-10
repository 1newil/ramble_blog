import React from "react";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  body: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ body }) => {
  console.log("SubmitButtonProps: ", body);
  const handleClick = async (body: SubmitButtonProps) => {
    // Invoke server action here

    const payload = {
      title: "Title",
      markdownContent: body,
      thumbnailUrl:
        "https://images.freeimages.com/variants/vyCXSWUjnrmHnfVvU3cu2tNV/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=500",
    };
    try {
      const response = await fetch("http://localhost:4000/api/blogs", {
        method: "POST",
        body: JSON.stringify({ payload }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("data: ", data);
      return data;
      // Handle response
    } catch (error) {
      // Handle error
    }
  };

  return <Button onClick={() => handleClick({ body: body })}>Submit</Button>;
};
