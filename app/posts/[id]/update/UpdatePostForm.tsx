'use client';

interface UpdatePostFormProps {
  post: { title: string; content?: string };
  handleUpdate: (formData: FormData) => Promise<void>;
}

export default function UpdatePostForm({ post, handleUpdate }: UpdatePostFormProps) {
  return (
    <form action={handleUpdate} className="space-y-4">
      <input name="title" defaultValue={post.title} className="border p-2 rounded w-full" />
      <textarea name="content" defaultValue={post.content ?? ""} className="border p-2 rounded w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
}
