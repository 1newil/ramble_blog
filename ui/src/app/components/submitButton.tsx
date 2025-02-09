import React from "react";
import { Button } from "../../components/ui/button";
import { post } from "@/app/actions/blogActions";
import { useRouter } from "next/navigation";
interface SubmitButtonProps {
  body: string;
  title: string;
  thumbnailUrl?: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  body,
  title,
  setText,
  setTitle,
  thumbnailUrl,
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
      thumbnailUrl:
        thumbnailUrl ||
        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
    };
    console.log("payload", payload);
    await post(payload);
    setText("");
    setTitle("");
    router.push("/");
  };

  return (
    <Button onClick={() => handleClick()} disabled={!title || !body}>
      Submit
    </Button>
  );
};
