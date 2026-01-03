"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";

interface Post {
  id: number;
  title: string;
  content: string | null;
  category: string | null;
  authorId: number | null;
}

interface Props {
  post: Post;
  categorySlug: string;
  lang: string;
  unknownLabel: string;
  editLabel: string;
  author?: string;
  showDeleteButton?: boolean;
}

export default function PostTableRow({
  post,
  categorySlug,
  lang,
  unknownLabel,
  editLabel,
  author,
  showDeleteButton = false,
}: Props) {
  const router = useRouter();

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    // Ignore clicks on links and buttons
    if (
      (e.target as HTMLElement).closest("a") ||
      (e.target as HTMLElement).closest("button")
    ) {
      return;
    }

    // Navigate to modal
    router.push(`/posts/${categorySlug}/${post.id}?lang=${lang}`);
  };

  return (
    <tr
      className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
      onClick={handleRowClick}
    >
      <td className="border p-2 text-center text-gray-700 dark:text-gray-300">
        <Link
          href={`/post/${post.id}?lang=${lang}`}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
          onClick={(e) => e.stopPropagation()}
        >
          {post.id}
        </Link>
      </td>
      <td className="border p-2 text-gray-700 dark:text-gray-300 font-medium">
        {post.title}
      </td>
      <td className="border p-2 text-gray-600 dark:text-gray-400 truncate max-w-xs">
        {post.content}
      </td>
      <td className="border p-2 text-gray-700 dark:text-gray-300">
        {post.category ?? unknownLabel}
      </td>
      {author !== undefined && (
        <td className="border p-2 text-gray-700 dark:text-gray-300">
          {author ?? unknownLabel}
        </td>
      )}
      <td
        className="border p-2 flex gap-2 justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          href={`/posts/${categorySlug}/${post.id}?lang=${lang}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
        >
          {editLabel}
        </Link>
        {showDeleteButton && (
          <DeleteButton
            postId={post.id}
            postTitle={post.title}
            lang={lang}
          />
        )}
      </td>
    </tr>
  );
}
