import prisma from "@/lib/prisma";
import ClientPost from "./ClientPost";

export default async function Posts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
   <>
   <ClientPost posts={posts} />
   </>
  );
}
