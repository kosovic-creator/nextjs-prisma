'use client';

import { JSX } from "react";

interface Author {
  name?: string;
}



type Post = {
  id: number;
  title: string;
  content?: string | null;
  published: boolean;
  authorId: number;
  author?: Author;
};

type ClientPostIdProps = {
  post: Post;
  id: string | number;
};

function ClientPostId({ post, id }: ClientPostIdProps): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8 text-[#333333]">{post.title}</h1>
        <p className="text-gray-600 text-center">by {post.author?.name || "Unknown"}</p>
        <div className="prose prose-gray mt-8">
          {post.content || "No content available."}
        </div>
      </article>
    </div>
  );
}

export default ClientPostId;
