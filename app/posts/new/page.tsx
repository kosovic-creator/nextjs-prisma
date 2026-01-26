import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getLocaleMessages } from "@/lib/i18n";
import PostForm from "../components/PostForm";

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

  const session = await getServerSession(authOptions);
  console.log("Session user id:", session?.user?.id);
  const userId = Number(session?.user?.id ?? 0);
  console.log("authorId koji se prosleđuje PostForm-u:", userId);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t("create_post")}</h1>
      <PostForm
        submitLabel={t("create_post")}
        successMessage={t("post_created_success")}
        messages={messages}
        lang={lang}
        authorId={userId}
      />
    </div>
  );
}