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