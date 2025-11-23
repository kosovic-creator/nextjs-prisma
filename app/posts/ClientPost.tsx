import React from 'react'

interface Author {
    id: number;
    name: string | null;
    email: string;
    password: string | null;
    role: string;
}

interface Post {
    id: number;
    title: string;
    content: string | null;
    published: boolean;
    authorId: number;
    author: Author;
}

interface ClientPostProps {
    posts: Post[];
}

const ClientPost: React.FC<ClientPostProps> = ({ posts }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 text-[#333333]">
            <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
                Posts
            </h1>
            <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
                {posts.map((post) => (
                    <li key={post.id}>
                        <span className="font-semibold">{post.title}</span>
                        <span className="text-sm text-gray-600 ml-2">
                            by {post.author.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientPost
