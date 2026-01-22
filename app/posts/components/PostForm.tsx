"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { postSchema } from "@/zod-schemas";
import { createOrUpdatePost } from "@/actions/post";

type PostFormProps = {
  initialTitle?: string;
  initialContent?: string;
  initialCategory?: string;
  submitLabel: string;
  successMessage: string;
  messages: Record<string, any>;
  lang: string;
  authorId: number;
  postId?: number;
};

export default function PostForm({
  initialTitle = "",
  initialContent = "",
  initialCategory = "",
  submitLabel,
  successMessage,
  messages,
  lang,
  authorId,
  postId
}: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState(initialCategory);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };

  useEffect(() => {
    if (showSuccess) {
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 3000);

      const redirectTimer = setTimeout(() => {
        router.push(`/posts?lang=${lang}`);
      }, 3500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(redirectTimer);
      };
    }
  }, [showSuccess, lang, router]);

  // Validacija pojedinačnog polja pri gubitku fokusa

  const validateField = (fieldName: string, value: string) => {
    try {
      const schema = postSchema(t);
      const fieldSchema = schema.shape[fieldName as keyof typeof schema.shape];
      if (!fieldSchema) return;

      fieldSchema.parse(value);

      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        if (firstError?.message) {
          setErrors(prev => ({ ...prev, [fieldName]: firstError.message }));
        }
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setServerError("");

    try {
      if (!authorId) throw new Error(t("no_author"));

      postSchema(t).parse({ title, content, category });

      const result = await createOrUpdatePost({
        id: postId,
        title,
        content,
        category,
        authorId,
      });

      if (!result.success) {
        throw new Error(result.error || "Request failed");
      }

      setShowSuccess(true);
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach(issue => {
          const path = issue.path[0] as string;
          fieldErrors[path] = issue.message;
        });
        setErrors(fieldErrors);
      } else if (err instanceof Error) {
        setServerError(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showSuccess && (
        <div className={`mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          {successMessage}
        </div>
      )}
      {serverError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {serverError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            {t("title")}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={handleBlur}
            placeholder={t("enter_post_title")}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="content" className="block text-lg mb-2">
            {t("content")}
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            onBlur={handleBlur}
            placeholder={t("enter_post_content")}
            rows={6}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>
        <div>
          <label htmlFor="category" className="block text-lg mb-2">
            {t("category")}
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            onBlur={handleBlur}
            placeholder={t("enter_post_category")}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors touch-manipulation"
          >
            {isSubmitting ? "..." : submitLabel}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/posts?lang=${lang}`)}
            className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors touch-manipulation"
          >
            {t("cancel")}
          </button>
        </div>
      </form>
    </>
  );
}
