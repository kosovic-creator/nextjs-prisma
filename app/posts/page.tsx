import { getAllPosts } from "@actions/post";
import ClientPost from "./ClientPost";

export default async function PostPage() {
  const posts = await getAllPosts();

  return (
   <>
   <ClientPost posts={posts} />
   </>
  );
}
