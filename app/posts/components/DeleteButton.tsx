"use client";

import { useState } from "react";
import { deletePostById } from "@/actions/post";

type DeleteButtonProps = {
  postId: number;
  postTitle: string;
  lang: string;
};

export default function DeleteButton({ postId, postTitle, lang }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const t = (en: string, sr: string) => lang === 'sr' ? sr : en;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePostById(postId);
      setIsOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
      setIsOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        {t("Delete", "Obriši")}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">
              {t("Confirm Deletion", "Potvrda brisanja")}
            </h3>
            <p className="mb-6">
              {t(
                `Are you sure you want to delete the post "${postTitle}"? This action cannot be undone.`,
                `Da li ste sigurni da želite da obrišete post "${postTitle}"? Ova akcija se ne može poništiti.`
              )}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                {t("Cancel", "Otkaži")}
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? t("Deleting...", "Brisanje...") : t("Delete", "Obriši")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
