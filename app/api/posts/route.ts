import prisma from "@/lib/prisma";

export async function GET() {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
        },
    });
    console.log("Posts iz baze:", posts);
    return new Response(JSON.stringify(posts), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: body.authorId,
        },
        include: {
            author: true,
        },
    });
    return new Response(JSON.stringify(post), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
}