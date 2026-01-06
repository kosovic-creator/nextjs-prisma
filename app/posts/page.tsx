/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAllPosts, deletePostById } from "@/actions/post";
import Link from "next/link";
import { getLocaleMessages } from "@/lib/i18n";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DeleteButton from "./components/DeleteButton";
import PostTableRow from "./components/PostTableRow";



type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
};

export default async function PostsPage({ searchParams }: Props) {
  // Access searchParams first to make the page dynamic
  const params = searchParams ? await searchParams : {};
  let lang = 'en';
  if (params.lang) {
    if (Array.isArray(params.lang)) {
      lang = params.lang[0] === 'sr' ? 'sr' : 'en';
    } else {
      lang = params.lang === 'sr' ? 'sr' : 'en';
    }
  }

  let posts: Awaited<ReturnType<typeof getAllPosts>>;
  let error: string | null = null;

  try {
    posts = await getAllPosts();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Greška pri učitavanju postova / Error loading posts';
    posts = [];
  }

  const messages = getLocaleMessages(lang, 'post');
  const t = (key: string) => (messages as Record<string, string>)[key] ?? key;
  const session = await getServerSession(authOptions);

  return (

    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t("posts")}</h1>

      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-bold">{lang === 'sr' ? '⚠️ Greška' : '⚠️ Error'}</p>
          <p>{error}</p>
        </div>
      )}

      <div className="mb-6">
          <Link href={`/posts/new?lang=${lang}`} className="bg-green-500 text-white px-4 py-2 rounded">{t("create_post")}</Link>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
              <th className="border p-2">{t("posts")}</th>
              <th className="border p-2">{t("content")}</th>
            <th className="border p-2">{t("category")}</th>
              <th className="border p-2">{t("author")}</th>
              <th className="border p-2">{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 && !error ? (
            <tr>
              <td colSpan={6} className="border p-4 text-center text-gray-500">
                {lang === 'sr' ? 'Nema postova' : 'No posts found'}
              </td>
            </tr>
          ) : (
              posts.map(post => {
                const categorySlug = encodeURIComponent(post.category ?? "uncategorized");
                return (
                  <PostTableRow
                    key={post.id}
                    post={post}
                    categorySlug={categorySlug}
                    lang={lang}
                    unknownLabel={t("Unknown")}
                    editLabel={t("edit_post")}
                    author={post.author?.name ?? undefined}
                    showDeleteButton={true}
                  />
                );
              })
          )}
        </tbody>
      </table>
        {/* <h1>The value of customKey is: {process.env.customKey}</h1> */}
    </div>

  );
}
