import prisma from "@/lib/prisma";

export async function GET() {
    const test_data = await prisma.testModel.findMany();
    // You may want to return a response, for example:
    return Response.json(test_data);
}

export async function POST(request: Request) {
    const { name, value } = await request.json();
    const newData = await prisma.testModel.create({
        data: {
            name,
            value,
        },
    });
    return Response.json(newData);
}