import { getAllPosts, createPost, updatePostById, deletePostById } from "@/actions/post";

export default async function PostPage() {
  const posts = await getAllPosts();

  async function handleCreate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    // AuthorId možeš dohvatiti iz sesije ili hardkodirati
    await createPost(title, content, 1);
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    await updatePostById(id, title, content);
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    await deletePostById(id);
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Posts</h1>
      <div className="mb-6">
        <a href="/posts/new" className="bg-green-500 text-white px-4 py-2 rounded">Add New Post</a>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Content</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} className="border-b">
              <td className="border p-2 text-center">
                <a href={`/posts/${post.id}`} className="text-blue-600 underline">{post.id}</a>
              </td>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.content}</td>
              <td className="border p-2">{post.author?.name ?? "Unknown"}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <a href={`/posts/${post.id}/update`} className="bg-blue-500 text-white px-2 py-1 rounded">Update</a>
                <form action={handleDelete}>
                  <input type="hidden" name="id" value={post.id} />
                  <button type="submit" className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
