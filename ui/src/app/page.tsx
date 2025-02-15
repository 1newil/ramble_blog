// This is a Server Component
import { getLastPosts } from "@/app/actions/blogActions";
import PostsContainer from "./components/postsContainer";

export default async function PostsWrapper() {
  const initialPosts = await getLastPosts(5); // Default limit is 5

  return (
    <div className="mx-auto">
      <PostsContainer initialPosts={initialPosts} />
    </div>
  );
}
