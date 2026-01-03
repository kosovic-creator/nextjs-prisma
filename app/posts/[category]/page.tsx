import { getLocaleMessages } from "@/lib/i18n";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPostsByCategoryForUser } from "@/actions/post";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PostsByCategoryPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const category = decodeURIComponent(resolvedParams.category);

  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id ?? 0);

  // Odredi jezik
  let lang = 'en';
  if (resolvedSearchParams.lang) {
    if (Array.isArray(resolvedSearchParams.lang)) {
      lang = resolvedSearchParams.lang[0] === 'sr' ? 'sr' : 'en';
    } else {
      lang = resolvedSearchParams.lang === 'sr' ? 'sr' : 'en';
    }
  }

  const messages = getLocaleMessages(lang, 'post');
  const t = (key: string) => (messages as Record<string, string>)[key] ?? key;

  if (!session || !userId) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <p className="mb-4 text-red-600">{t('Unauthorized user')}</p>
        <Link href={`/auth/prijava?lang=${lang}`} className="text-blue-600 underline">
          {t('Sign in')}
        </Link>
      </div>
    );
  }

  const posts = await getPostsByCategoryForUser(category, userId);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('posts')} — {category}</h1>
        <Link
          href={`/posts/new?lang=${lang}`}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {t('create_post')}
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="p-4 border rounded text-gray-500">{lang === 'sr' ? 'Nema postova u ovoj kategoriji' : 'No posts in this category'}</div>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">{t('title')}</th>
              <th className="border p-2">{t('content')}</th>
              <th className="border p-2">{t('category')}</th>
              <th className="border p-2">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => {
              const categorySlug = encodeURIComponent(post.category ?? 'uncategorized');
              return (
                <tr key={post.id} className="border-b">
                  <td className="border p-2 text-center">{post.id}</td>
                  <td className="border p-2">{post.title}</td>
                  <td className="border p-2">{post.content}</td>
                  <td className="border p-2">{post.category ?? t('Unknown')}</td>
                  <td className="border p-2 flex gap-2 justify-center">
                    <Link
                      href={`/posts/${categorySlug}/${post.id}?lang=${lang}`}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      {t('edit_post')}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
