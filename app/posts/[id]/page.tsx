/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPostById } from "@/actions/post";
import { notFound } from "next/navigation";
import ClientPostId from "./ClientPostId";



export default async function Post(props: any) {
  const params = await props.params;
  const id = Number(params.id);
  if (isNaN(id)) notFound();
  const post = await getPostById(id);
  if (!post) {
    notFound();
  }
  return (
    <>
      <ClientPostId post={post}  />
    </>
  );
}