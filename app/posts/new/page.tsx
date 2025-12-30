import Form from "next/form";
import { createPost } from "@/actions/post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getLocaleMessages } from "@/lib/i18n";

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
};
export default async function NewPost({ searchParams }: Props) {
  const resolvedSearchParams = searchParams ? await searchParams : {};

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

  async function serverAction(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (!userId) throw new Error("Nema korisnika!");
    await createPost(title, content, Number(userId));
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t("create_post")}</h1>
      <Form action={serverAction} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder={t("enter_post_title")}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder={t("enter_post_content")}
            rows={6}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          {t("create_post")}
        </button>
      </Form>
    </div>
  );
}