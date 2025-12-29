'use client';
// tipizacija
interface UpdatePostFormProps {
  post: { title: string; content?: string };
  handleUpdateProp: (formData: FormData) => Promise<void>;
}
// uvezuje prpos (podaci-post i handleUpdate kao handleUpdateProp )
export default function UpdatePostForm({ post, handleUpdateProp }: UpdatePostFormProps) {
  return (
    // klient forma koja koristi server akciju kao action
    <form action={handleUpdateProp} className="space-y-4">
      <input name="title" defaultValue={post.title} className="border p-2 rounded w-full" />
      <textarea name="content" defaultValue={post.content ?? ""} className="border p-2 rounded w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
}
