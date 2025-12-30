
import { getAllPosts, deletePostById } from "@/actions/post";
import Link from "next/link";
import { headers } from "next/headers";
import ClientLayout from "../components/ClientLayout";


export default async function PostsPage() {
  const posts = await getAllPosts();
  // Get lang from query param (default to 'en')
  let lang = "en";
  const headersList = await headers();
  const url = headersList.get("x-url") || headersList.get("referer") || "";
  if (url) {
    try {
      const u = new URL(url, "http://localhost");
      const l = u.searchParams.get("lang");
      if (l === "sr" || l === "en") lang = l;
    } catch { }
  }
  const t = (en: string, sr: string) => lang === "sr" ? sr : en;

  async function handleDelete(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    await deletePostById(id);
  }

  return (
    <ClientLayout lang={lang}>
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("Posts", "Objave")}</h1>
        
      </div>
      <div className="mb-6">
        <Link href={`/posts/new?lang=${lang}`} className="bg-green-500 text-white px-4 py-2 rounded">{t("Add New Post", "Dodaj novu objavu")}</Link>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">{t("Title", "Naslov")}</th>
            <th className="border p-2">{t("Content", "Sadržaj")}</th>
            <th className="border p-2">{t("Author", "Autor")}</th>
            <th className="border p-2">{t("Actions", "Akcije")}</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} className="border-b">
              <td className="border p-2 text-center">
                <Link href={`/posts/${post.id}?lang=${lang}`} className="text-blue-600 underline">{post.id}</Link>
              </td>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.content}</td>
              <td className="border p-2">{post.author?.name ?? t("Unknown", "Nepoznato")}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <a href={`/posts/${post.id}?lang=${lang}`} className="bg-blue-500 text-white px-2 py-1 rounded">{t("Update", "Izmeni")}</a>
                <form action={handleDelete}>
                  <input type="hidden" name="id" value={post.id} />
                  <button type="submit" className="bg-red-500 text-white px-2 py-1 rounded">{t("Delete", "Obriši")}</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       <h1>The value of customKey is: {process.env.customKey}</h1>
    </div>
    </ClientLayout>
  );
}
