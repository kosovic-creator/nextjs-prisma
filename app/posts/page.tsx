import ClientPost from "./ClientPost";
import { getAllPosts } from "@/actions/post/post";

export default async function PostPage() {
  const posts = await getAllPosts();

  return (
   <>
   <ClientPost posts={posts} />
   </>
  );
}
