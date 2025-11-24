/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    const params = await context.params;
    console.log("params:", params);
    const id = Number(params.id);
    if (isNaN(id)) {
        return new Response(JSON.stringify({ error: "Invalid id" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
    const post = await prisma.post.findUnique({
        where: { id },
    });
    return new Response(JSON.stringify(post), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const params = await context.params;
    const id = Number(params.id);
    console.log("Deleting post with id:", id);
    if (isNaN(id)) {
        return new Response(JSON.stringify({ error: "Invalid id" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
    try {
        await prisma.post.delete({
            where: { id },
        });
        return new Response(null, { status: 204 }); // No Content, uspešno izbrisano
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    const params = await context.params;
    const id = Number(params.id);
    if (isNaN(id)) {
        return new Response(JSON.stringify({ error: "Invalid id" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
    const body = await request.json();
    try {
        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                title: body.title,
                content: body.content,
            },
        });
        return new Response(JSON.stringify(updatedPost), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
