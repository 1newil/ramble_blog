import React from "react";
import { Button } from "../../components/ui/button";
import { updateBySlug } from "@/app/actions/blogActions";
import { useRouter } from "next/navigation";
import { Tag } from "@/app/types/types";

interface EditButtonProps {
  body: string;
  title: string;
  thumbnailUrl?: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  tags: Tag[];
  slug: string;
}

export const EditButton: React.FC<EditButtonProps> = ({
  body,
  title,
  setText,
  setTitle,
  thumbnailUrl,
  tags,
  slug,
}) => {
  const router = useRouter();
  const handleClick = async () => {
    console.log("body", body);
    if (!body || body.trim() === "") {
      console.error("Error: Body is empty or undefined.");
      return;
    }
    const payload = {
      title: title,
      markdownContent: body,
      tags,
      thumbnailUrl:
        thumbnailUrl ||
        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
    };
    console.log("payload", payload);
    await updateBySlug(payload, slug);
    setText("");
    setTitle("");
    router.push("/");
  };

  return (
    <Button
      variant="secondary"
      onClick={() => handleClick()}
      disabled={!title || !body}
    >
      Confirm Edit
    </Button>
  );
};
