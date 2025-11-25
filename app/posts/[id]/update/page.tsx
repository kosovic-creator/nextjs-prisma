import { getPostById, updatePostById } from "@/actions/post";
import { notFound } from "next/navigation";

export default async function UpdatePostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  console.log('UpdatePostPage params:', resolvedParams);
  const id = Number(resolvedParams?.id);
  console.log('UpdatePostPage id:', id);
  if (!resolvedParams?.id || isNaN(id)) notFound();
  const post = await getPostById(id);
  if (!post) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    await updatePostById(id, title, content);
    // redirect("/posts");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Update Post</h1>
      <form action={handleUpdate} className="space-y-4">
        <input name="title" defaultValue={post.title} className="border p-2 rounded w-full" />
        <textarea name="content" defaultValue={post.content ?? ""} className="border p-2 rounded w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
