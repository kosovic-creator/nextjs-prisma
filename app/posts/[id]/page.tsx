import { getPostById, updatePostById } from "@/actions/post";
import { notFound, redirect } from "next/navigation";
import { getLocaleMessages } from "@/lib/i18n";


type Props = {
  params: Promise<{ id: string }>,
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
};

export default async function UpdatePostPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const id = Number(resolvedParams?.id);
  if (!resolvedParams?.id || isNaN(id)) notFound();
  const post = await getPostById(id);
  if (!post) notFound();

  // Odredi jezik
  let lang = 'en';
  if (resolvedSearchParams.lang) {
    if (Array.isArray(resolvedSearchParams.lang)) {
      lang = resolvedSearchParams.lang[0] === 'sr' ? 'sr' : 'en';
    } else {
      lang = resolvedSearchParams.lang === 'sr' ? 'sr' : 'en';
    }
  }

  // Učitaj prevode
  const messages = getLocaleMessages(lang, 'post');
  const t = (key: string) => (messages as Record<string, string>)[key] ?? key;

  async function handleUpdate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    await updatePostById(id, title, content);
    redirect(`/posts?lang=${lang}`);
  }

  return (


  <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t("edit_post")}</h1>
      <form action={handleUpdate} className="space-y-4">
        <input name="title" defaultValue={post.title} className="border p-2 rounded w-full" />
        <textarea
          name="content"
          defaultValue={post.content ?? ""}
          className="border p-2 rounded w-full"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{t('Update')}</button>
      </form>
    </div>





  );}