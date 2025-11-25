/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPostById, updatePostById, deletePostById } from "@/actions/post";
import { notFound } from "next/navigation";


export default async function Post({ params }: { params: { id: string } }) {
  params=await params;
  const id = Number(params.id);
  if (isNaN(id)) notFound();
  const post = await getPostById(id);
  if (!post) {
    notFound();
  }

  async function updateAction(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    await updatePostById(id, title, content);
  }

  async function deleteAction() {
    "use server";
    await deletePostById(id);
  }

  return (
    <>
    <form action={updateAction} className="mt-8 space-y-4">
      <input name="title" defaultValue={post.title} className="border p-2 rounded w-full" />
      <textarea name="content" defaultValue={post.content ?? ""} className="border p-2 rounded w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
    </form>
    <form action={deleteAction} className="mt-4">
      <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
    </form>
    </>
  );
}