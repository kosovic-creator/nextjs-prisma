/* eslint-disable @typescript-eslint/no-explicit-any */
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, content, published, authorId } = body;

    if (!id || isNaN(Number(id))) {
      return new Response(JSON.stringify({ error: "Invalid or missing id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update u bazi po id iz body-ja
    await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, published, authorId },
    });

    return new Response(null, { status: 204 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id || isNaN(Number(id))) {
      return new Response(JSON.stringify({ error: "Invalid or missing id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await prisma.post.delete({ where: { id: Number(id) } });

    return new Response(null, { status: 204 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
