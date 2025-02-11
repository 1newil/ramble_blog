import Markdown from "react-markdown";
import { getPosts } from "./actions/blogActions";
import PostsContainer from "./components/postsContainer";
import MarkdownInput from "./components/markdown_input";

export default async function Home() {
  const posts = await getPosts();
  console.log("posts: ", posts);
  return (
    <div className="mx-32 px-auto mt-12 space-y-4">
      <PostsContainer posts={posts} />
      <MarkdownInput />
    </div>
  );
}
