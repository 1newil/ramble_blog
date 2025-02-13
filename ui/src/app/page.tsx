import Markdown from "react-markdown";
import { getPosts } from "./actions/blogActions";
import PostsContainer from "./components/postsContainer";
import MarkdownInput from "./components/markdown_input";
import Hero from "./components/hero";

export default async function Home() {
  const posts = await getPosts();
  console.log("posts: ", posts);
  return (
    <div className="mx-32 h-screen px-auto mt-4 space-y-4">
      <PostsContainer posts={posts} />
    </div>
  );
}
