import React from "react";
import { Button } from "../../components/ui/button";
import { deletePost } from "@/app/actions/blogActions";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  slug: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ slug }) => {
  const router = useRouter();
  const handleClick = async () => {
    await deletePost(slug);

    router.push("/");
  };

  return (
    <Button variant="destructive" onClick={() => handleClick()}>
      Delete
    </Button>
  );
};
