import { getPostById } from "@/actions/post";
import { notFound } from "next/navigation";
import { getLocaleMessages } from "@/lib/i18n";
import PostForm from "./../../posts/components/PostForm";

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function UpdatePostByIdPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const id = Number(resolvedParams?.id);
  if (!resolvedParams?.id || isNaN(id)) notFound();

  const post = await getPostById(id);
  if (!post) notFound();

  let lang = "en";
  if (resolvedSearchParams.lang) {
    if (Array.isArray(resolvedSearchParams.lang)) {
      lang = resolvedSearchParams.lang[0] === "sr" ? "sr" : "en";
    } else {
      lang = resolvedSearchParams.lang === "sr" ? "sr" : "en";
    }
  }

  const messages = getLocaleMessages(lang, "post");
  const t = (key: string) => (messages as Record<string, string>)[key] ?? key;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t("edit_post")}</h1>
      <PostForm
        initialTitle={post.title}
        initialContent={post.content ?? ""}
        initialCategory={post.category ?? ""}
        submitLabel={t("edit_post")}
        successMessage={t("post_updated_success")}
        messages={messages}
        lang={lang}
        authorId={post.authorId ?? 0}
        postId={post.id}
      />
    </div>
  );
}
