// This is a Server Component
import { getLastPosts } from "@/app/actions/blogActions";
import PostsContainer from "./components/postsContainer";
import Hero from "./components/hero";

export default async function PostsWrapper() {
  const initialPosts = await getLastPosts(5); // Default limit is 5

  return (
    <div className="mx-auto">
      <Hero />
      <PostsContainer initialPosts={initialPosts} />
    </div>
  );
}
