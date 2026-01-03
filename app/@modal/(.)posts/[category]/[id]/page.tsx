"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface Post {
  id: number;
  title: string;
  content: string | null;
  category: string | null;
  authorId: number | null;
}

export default function PostModal() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const id = params.id as string;
  const category = params.category as string;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setError(null);
        } else {
          setError("Post nije pronađen");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Greška pri učitavanju posta");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleClose = () => {
    router.back();
  };

  const handleOpenFull = () => {
    const lang = searchParams.get("lang") || "sr";
    router.push(`/posts/${category}/${id}?lang=${lang}`);
  };

  return (
    <>
      {/* Blur overlay pozadina */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {loading ? (
            <div className="p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          ) : error || !post ? (
            <div className="p-8">
              <p className="text-red-600 dark:text-red-400 mb-6">
                {error || "Post nije pronađen"}
              </p>
              <button
                onClick={handleClose}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                ← Nazad
              </button>
            </div>
          ) : (
            <div className="p-8">
              <div className="mb-6 flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                    {post.title}
                  </h2>
                  {post.category && (
                    <div className="mt-4">
                      <span className="inline-block px-4 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Zatvori"
                >
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
                  {post.content}
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleOpenFull}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-semibold shadow-sm"
                >
                  Otvori punu stranicu
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors text-sm font-semibold"
                >
                  Zatvori
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
