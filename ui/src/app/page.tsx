// This is a Server Component
import { getLastPosts } from "@/app/actions/blogActions";
import PostsContainer from "./components/postsContainer";
import Hero from "./components/hero";

export default async function PostsPage() {
  const initialPosts = await getLastPosts(1, 5); // Default limit is 5
  if (!initialPosts) return <div>Fetching posts failed</div>;
  return (
    <div className="flex flex-col min-h-screen sm:mx-auto">
      <Hero />
      <PostsContainer initialPosts={initialPosts} />
    </div>
  );
}
